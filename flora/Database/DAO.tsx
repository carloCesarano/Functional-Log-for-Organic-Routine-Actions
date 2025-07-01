import * as SQLite from 'expo-sqlite';
import {SQLiteDatabase, SQLiteStatement} from 'expo-sqlite';

let db: SQLiteDatabase | null = null;

export type Riga = Record<string, string | number | null>;

function getDB(): SQLiteDatabase {
    if (!db) {
        db = SQLite.openDatabaseSync('FLORA1');
        popolaDB(db);
    }
    return db;
}

function popolaDB(db: SQLiteDatabase): void {
    db.execSync("PRAGMA foreign_keys = ON;");

    db.execSync(`
        DROP TABLE IF EXISTS Interventi;
        DROP TABLE IF EXISTS PianteCategorie;
        DROP TABLE IF EXISTS PiantePossedute;
        DROP TABLE IF EXISTS Categorie;
        DROP TABLE IF EXISTS WikiPiante;
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS WikiPiante (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            specie       TEXT    NOT NULL UNIQUE,
            freqInnaff   INTEGER NOT NULL,
            freqPotat    INTEGER NOT NULL,
            freqRinv     INTEGER NOT NULL,
            foto         TEXT
        );
        CREATE TABLE IF NOT EXISTS Categorie (
            id   INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT    NOT NULL UNIQUE
        );
        CREATE TABLE IF NOT EXISTS PiantePossedute (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            nome    TEXT    NOT NULL,
            specie  TEXT    NOT NULL,
            acq     TEXT    NOT NULL,
            note    TEXT,
            foto    TEXT,
            FOREIGN KEY (specie) REFERENCES WikiPiante(specie)
                ON UPDATE CASCADE ON DELETE RESTRICT
        );
        CREATE TABLE IF NOT EXISTS PianteCategorie (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            pianta    INTEGER NOT NULL,
            categoria INTEGER NOT NULL,
            FOREIGN KEY (pianta) REFERENCES PiantePossedute(id)
                ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (categoria) REFERENCES Categorie(id)
                ON UPDATE CASCADE ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS Interventi (
            id     INTEGER PRIMARY KEY AUTOINCREMENT,
            pianta INTEGER NOT NULL,
            tipo   TEXT    NOT NULL CHECK (tipo IN ('INN', 'POT', 'RINV')),
            data   TEXT    NOT NULL,
            FOREIGN KEY (pianta) REFERENCES PiantePossedute(id)
                ON UPDATE CASCADE ON DELETE CASCADE
        )
    `);
}

export async function getAll<T extends Riga>(tabella: string): Promise<T[]> {
    try {
        return await getDB().getAllAsync<T>(`SELECT * FROM ${tabella}`);
    } catch (error: any) {
        throw new Error(`Errore in GETALL (${tabella}): ${error.message}`);
    }
}

export async function get<T extends Riga>(tabella: string, filtro: Partial<T>): Promise<T[]> {
    try {
        const righe: T[] = await getAll<T>(tabella);
        return righe.filter(riga =>
            Object.entries(filtro).every(([chiave, valore]) =>
                riga[chiave] === valore)
        )
    } catch (error: any) {
        throw new Error(`Errore in GET (${tabella}): ${error.message}`);
    }
}

export async function insert<T extends Riga>(tabella: string, riga: Omit<T, "id">): Promise<number> {
    try {
        // OTTENGO I DATI
        const chiavi: string[] = Object.keys(riga);
        const valori: string[] = Object.values(riga);

        // PREPARO LA QUERY
        const segnaposto: string = valori.map(() => '?').join(', ');

        const query: string = `INSERT INTO ${tabella} (${chiavi.join(', ')})
                               VALUES (${segnaposto});`;
        const stmt: SQLiteStatement = getDB().prepareSync(query);

        // ESEGUO LA QUERY
        const risultato = stmt.executeSync(...valori);

        // RESTITUISCO L'ID
        return risultato.lastInsertRowId as number;
    } catch (error: any) {
        throw new Error(`Errore in INSERT (${tabella}): ${error.message}`);
    }
}

export async function update<T extends Riga>(tabella: string, riga: T): Promise<void> {
    try {
        // OTTENGO I DATI
        const {id, ...campi} = riga as any;
        const chiavi: string[] = Object.keys(campi);
        const valori: string[] = Object.values(campi);

        // PREPARO LA QUERY
        const clausolaSet: string = chiavi.map(k => `${k} = ?`).join(', ');
        const query: string = `UPDATE ${tabella} SET ${clausolaSet} WHERE id = ?`;

        const statement: SQLiteStatement = getDB().prepareSync(query);

        // ESEGUO LA QUERY
        statement.executeSync(...valori, id);
    } catch (error: any) {
        throw new Error(`Errore in UPDATE (${tabella}): ${error.message}`);
    }
}

export async function remove(tabella: string, id: number): Promise<void> {
    try {
        const query: string = `DELETE FROM ${tabella} WHERE id = ${id};`;
        getDB().execSync(query);
    } catch (error: any) {
        throw new Error(`Errore in REMOVE (${tabella}): ${error.message}`);
    }
}
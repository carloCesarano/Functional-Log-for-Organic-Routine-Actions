import * as SQLite from 'expo-sqlite';
import {SQLiteDatabase, SQLiteStatement} from 'expo-sqlite';

let db: SQLiteDatabase | null = null;

export type Riga = Record<string, string | number | null>;

function getDB(): SQLiteDatabase {
    if (!db) {
        db = SQLite.openDatabaseSync('FLORA1');
        db.execSync("PRAGMA foreign_keys = ON;");
        // if (DBVuoto(db))
            popolaDB(db);
    }
    return db;
}

function DBVuoto(db: SQLiteDatabase): boolean {
    try {
        const query = "SELECT * FROM sqlite_master WHERE type='table' AND name='WikiPiante';";
        const risultati: any = db.getAllSync(query);
        return risultati.length === 0;
    } catch (error: any) {
        throw new Error(`Errore in VOID CHECK: ${error.message}`);
    }
}

function popolaDB(db: SQLiteDatabase): void {
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
        );
    `);

    db.execSync(`
    INSERT INTO WikiPiante (specie, freqInnaff, freqPotat, freqRinv) VALUES
        ('Ficus',              7,  60, 365),
        ('Sanseveria',        14, 180, 730),
        ('Pothos',             5,  30, 365),
        ('Zamioculca',        10,  90, 730),
        ('Spatifillo',         4,  45, 365),
        ('Orchidea',           7,  60, 730),
        ('Anthurium',          5,  60, 365),
        ('Begonia',            4,  30, 365),
        ('Geranio',            3,  20, 180),
        ('Ciclamino',          4,  30, 180),
        ('Kalanchoe',          7,  45, 365),
        ('Guzmania',           6,  60, 365),
        ('Amarillide',         5,  45, 365),
        ('Violette africane',  3,  30, 180),
        ('Clivia',             7,  60, 730),
        ('Calla',              5,  30, 365),
        ('Impatiens',          3,  20, 180),
        ('Stella di Natale',   6,  60, 365),
        ('Basilico',           2,  15,  90),
        ('Peperoncino',        3,  30, 180);
    INSERT INTO PiantePossedute (nome, specie, acq, note, foto) VALUES
        ('Fico',                'Ficus',      '2023-05-01', 'Pianta regalo', NULL),
        ('Lingua di suocera',   'Sanseveria', '2022-11-15', '',              NULL),
        ('Potus',               'Pothos',     '2024-01-10', 'Cresce bene',   NULL),
        ('Clivia',              'Clivia',     '2024-02-10', 'Bella pianta!', NULL),
        ('Basilico di mamma',   'Basilico',   '2025-01-01', 'Qualità media', NULL);
    INSERT INTO Interventi (pianta, tipo, data) VALUES
        (1, 'INN', '2025-07-03'),
        (1, 'POT', '2025-07-03'),
        (1, 'RINV', '2025-07-03'),
        (2, 'INN', '2024-06-02'),
        (2, 'POT', '2025-07-3'),
        (2, 'RINV', '2025-07-02'),
        (3, 'INN', '2025-07-01'),
        (3, 'POT', '2025-07-03'),
        (3, 'RINV', '2025-07-03'),
        (4, 'INN', '2025-05-01'),
        (4, 'POT', '2025-04-03'),
        (4, 'RINV', '2025-06-03'),
        (5, 'INN', '2025-06-30'),
        (5, 'POT', '2025-06-15'),
        (5, 'RINV', '2025-07-05');
    `);

    db.execSync(`
        INSERT INTO Categorie (nome) VALUES
            ('Appartamento'),
            ('Esterno'),
            ('Fiorita'),
            ('Grassa'),
            ('Aromatica'),
            ('Sempreverde');
    `);

    db.execSync(`
    INSERT INTO PianteCategorie (pianta, categoria) VALUES
        (1, 1), -- Fico -> Appartamento
        (1, 6), -- Fico -> Sempreverde
        (2, 1), -- Lingua di suocera -> Appartamento
        (2, 4), -- Lingua di suocera -> Grassa
        (3, 1), -- Potus -> Appartamento
        (3, 3), -- Potus -> Fiorita
        (4, 2), -- Clivia -> Esterno
        (4, 3), -- Clivia -> Fiorita
        (5, 5); -- Basilico di mamma -> Aromatica
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
        statement.executeSync([...valori, id]);
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

export async function stampaTabella(tabella: string): Promise<void> {
    try {
        const risultato = await getAll(tabella);
        if (risultato.length === 0) {
            console.log(`Tabella ${tabella} vuota`);
            return;
        }

        const intestazione = Object.keys(risultato[0]);
        console.log(intestazione.join(' | '));

        for (const riga of risultato) {
            const valori = intestazione.map(k => (riga[k]))
            console.log(valori.join(' | '));
        }
    } catch (error: any) {
        throw new Error(`Errore in STAMPATABELLA(${tabella}: ${error.message}`)
    }
}
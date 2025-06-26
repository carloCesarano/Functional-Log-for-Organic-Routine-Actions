import {SQLiteDatabase} from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import {DBRow} from "./Database";

let db : SQLiteDatabase | null = null;

function getDB() : SQLiteDatabase {
    if (!db) {
        db = SQLite.openDatabaseSync('floraDB');
        populateDB(db);
    }
    return db;
}

function populateDB(db: SQLiteDatabase): void {
    db.execSync("PRAGMA foreign_keys = ON;");
    db.execSync(`
        DROP TABLE IF EXISTS PiantePossedute;
        DROP TABLE IF EXISTS Categoria;
        DROP TABLE IF EXISTS WikiPiante;
    `);
    db.execSync(`
        CREATE TABLE IF NOT EXISTS WikiPiante (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            specie       TEXT    NOT NULL UNIQUE,
            nome         TEXT    NOT NULL,
            freqInnaff   INTEGER NOT NULL,
            freqPotat    INTEGER NOT NULL,
            freqRinv     INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS Categoria (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            categoria    TEXT    UNIQUE 
        );
        CREATE TABLE IF NOT EXISTS PiantePossedute (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            nome         TEXT    NOT NULL,
            specie       TEXT    NOT NULL,
            acquisizione TEXT,
            ultimaInnaff TEXT,
            ultimaPotat  TEXT,
            ultimoRinv   TEXT,
            note         TEXT,
            categoria    TEXT,
            foto         TEXT,
            FOREIGN KEY (categoria) REFERENCES Categoria(categoria) ON UPDATE CASCADE ON DELETE RESTRICT,
            FOREIGN KEY (specie) REFERENCES WikiPiante(specie) ON UPDATE CASCADE ON DELETE RESTRICT
        );
    `);

    // Esempio
    db.execSync(`
    INSERT INTO Categoria (categoria) VALUES
        ('Da giardino'),
        ('Da terrazzo'),
        ('Da interno'),
        ('Da camera');
    INSERT INTO WikiPiante (specie, nome, freqInnaff, freqPotat, freqRinv) VALUES
        ('Monstera deliciosa', 'Monstera', 7, 180, 30),
        ('Ficus elastica', 'Ficus', 7, 90, 30),
        ('Strelitzia reginae', 'Uccello del paradiso', 5, 120, 20);
    INSERT INTO PiantePossedute (nome, specie, acquisizione, ultimaInnaff, ultimaPotat, ultimoRinv, note, categoria) VALUES
        ('Pianta1', 'Monstera deliciosa', '2024-01-15', '2025-06-24', '2024-01-15', '2024-02-01', 'In salotto', 'Da giardino'),
        ('Pianta2', 'Strelitzia reginae', '2025-01-15', '2025-06-22', '2025-07-15', '2026-05-01', 'Terrazzo', 'Da terrazzo'),
        ('Pianta3', 'Ficus elastica',     '2025-01-15', '2025-06-25', '2025-07-15', '2026-05-01', 'Balcone', 'Da interno'),
        ('Pianta4', 'Strelitzia reginae', '2025-01-15', '2025-06-21', '2025-07-15', '2026-05-01', 'Terrazzo', 'Da camera'),
        ('Pianta5', 'Strelitzia reginae', '2025-01-15', '2025-06-20', '2025-07-15', '2026-05-01', 'Terrazzo', null),
        ('Pianta6', 'Strelitzia reginae', '2025-01-15', '2025-06-24', '2025-07-15', '2026-05-01', 'Terrazzo', null),
        ('Pianta7', 'Strelitzia reginae', '2025-01-15', '2025-06-23', '2025-07-15', '2026-05-01', 'Terrazzo', null);
    `);
}

export async function select<T extends DBRow>(table: string) : Promise<T[]> {
    try {
        return getDB().getAllAsync<T>(`SELECT * FROM ${table}`);
    } catch (error) {
        console.error("SELECT error for mobile:", error);
        return [];
    }
}

export async function insert<T extends DBRow>(table: string, item: Omit<T, "id">) : Promise<number | undefined> {
    try {
        // Preparo la query INSERT
        const keys: string[] = Object.keys(item);
        const values: string = Object.values(item)
            .map((v) => {
                if (typeof v === 'string')
                    return `'${v.replace(/'/g, "''")}'`;
                if (v instanceof Date)
                    return `'${v.toISOString()}'`;
                if (typeof v === 'boolean')
                    return Number(v).toString();
                if (v === null || v === undefined)
                    return 'NULL';
                return v;
            })
            .join(', ');
        const query: string = `INSERT INTO ${table} (${keys.join(", ")})
                               VALUES (${values});`

        // Eseguo la query INSERT
        getDB().execSync(query);

        // Eseguo la SELECT della tabella
        const rows: T[] = await select<T>(table);

        // Scorro tutte le righe per cercare quella identica
        for (let i = rows.length - 1; i >= 0; i--) {
            const row: T = rows[i];
            let match : boolean = true;
            for (const key of keys) {
                const rowValue = row[key];
                const itemValue = item[key];
                if (rowValue !== itemValue) {
                    match = false;
                    break;
                }
            }

            if (match)
                return row.id as number;
        }

        return undefined;
    } catch (error) {
        console.error("INSERT error for mobile:", error);
        return undefined;
    }
}

export async function update<T extends DBRow>(table: string, item: T) : Promise<void> {
    try {
        if (item.id === undefined) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error("Missing ID in UPDATE for web");
        }
        const updates : string = Object.entries(item)
            .filter(([key]) => key !== 'id')
            .map(([key, value]) => {
                if (typeof value === 'string')
                    return `'${key} = ${value.replace(/'/g, "''")}'`;
                if (value instanceof Date)
                    return `'${key} = '${value.toISOString()}'`;
                if (typeof value === 'boolean')
                    return `'${key} = ${Number(value)}`;
                if (value === null || value === undefined)
                    return `'${key} = NULL`;
                return `'${key} = ${value}`;
            })
            .join(', ');
        const query : string = `UPDATE ${table} SET ${updates} WHERE id = ${item.id}`;

        getDB().execSync(query);
    } catch (error) {
        console.error("UPDATE error for mobile:", error);
    }
}

export async function remove<T extends DBRow>(table: string, id: number) : Promise<void> {
    try {
        const query : string = `DELETE FROM ${table} WHERE id = ${id};`;
        getDB().execSync(query);
    } catch (error) {
        console.error("REMOVE error for mobile:", error);
    }
}

export async function get<T extends DBRow>(table: string, id: number): Promise<T | null> {
    try {
        const results = await getDB().getAllAsync<T>(
            `SELECT *
             FROM ${table}
             WHERE id = ${id}`
        );

        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error("GET error for mobile:", error);
        return null;
    }
}
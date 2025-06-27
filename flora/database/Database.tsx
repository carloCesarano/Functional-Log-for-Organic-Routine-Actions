import {SQLiteDatabase} from "expo-sqlite";
import * as SQLite from "expo-sqlite";

let db: SQLiteDatabase | null = null;

/**
 * Tipo base per una riga di qualsiasi tabella nel database.
 */
export type DBRow = Record<string, string | number | boolean | Date | null>;

function getDB(): SQLiteDatabase {
    if (!db) {
        db = SQLite.openDatabaseSync('floraDB');
        popolaDB(db);
    }
    return db;
}

function popolaDB(db: SQLiteDatabase): void {
    db.execSync("PRAGMA foreign_keys = ON;");
    db.execSync(`
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
            freqRinv     INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS Categorie (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            categoria    TEXT    NOT NULL,
            pianta       INTEGER NOT NULL,
            FOREIGN KEY (pianta) REFERENCES PiantePossedute(id) ON UPDATE CASCADE ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS PiantePossedute (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            specie       TEXT    NOT NULL,
            nome         TEXT    NOT NULL,
            dataAcq      TEXT    NOT NULL,
            ultimaInnaff TEXT    NOT NULL,
            ultimaPotat  TEXT    NOT NULL,
            ultimoRinv   TEXT    NOT NULL,
            note         TEXT,
            foto         TEXT,
            FOREIGN KEY (specie) REFERENCES WikiPiante(specie) ON UPDATE CASCADE ON DELETE RESTRICT
        );
    `);

    db.execSync(`
    INSERT INTO WikiPiante (specie, freqInnaff, freqPotat, freqRinv) VALUES
        ('Ficus',              7,  60, 365),
        ('Sanseveria',        14, 180, 730),
        ('Photos',             5,  30, 365),
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
    INSERT INTO PiantePossedute (nome, specie, dataAcq, ultimaInnaff, ultimaPotat, ultimoRinv, note, foto) VALUES
        ('Fico da salotto',       'Ficus',       '2024-10-01', '2025-06-25', '2025-05-01', '2025-01-01', '', ''),
        ('Serpente verde',        'Sanseveria',  '2023-05-10', '2025-06-20', '2024-12-20', '2023-06-01', '', ''),
        ('Rampicante da ufficio', 'Photos',      '2024-09-15', '2025-06-26', '2025-06-01', '2025-01-01', '', ''),
        ('Zamia',                 'Zamioculca',  '2024-03-20', '2025-06-22', '2025-04-01', '2023-03-20', '', ''),
        ('Fiore della pace',      'Spatifillo',  '2025-02-01', '2025-06-26', '2025-05-10', '2025-02-01', '', ''),
        ('Mini orchidea',         'Orchidea',    '2024-12-25', '2025-06-20', '2025-06-01', '2024-12-25', '', ''),
        ('Begonia da cucina',     'Begonia',     '2025-04-15', '2025-06-24', '2025-06-01', '2025-04-15', '', ''),
        ('Rosso passione',        'Anthurium',   '2024-11-11', '2025-06-25', '2025-05-01', '2024-11-11', '', ''),
        ('Peperoncino nano',      'Peperoncino', '2025-03-01', '2025-06-26', '2025-05-30', '2025-03-01', '', ''),
        ('Basilico fresco',       'Basilico',    '2025-06-01', '2025-06-27', '2025-06-20', '2025-06-10', '', '');
    INSERT INTO Categorie (categoria, pianta) VALUES
        ('Salotto',     1),
        ('Preferite',   1),
        ('Camera',      2),
        ('Ufficio',     3),
        ('Da spostare', 3),
        ('Salotto',     4),
        ('Bagno',       5),
        ('Camera',      6),
        ('Preferite',   6),
        ('Cucina',      7),
        ('Cucina',      8),
        ('Balcone',     9),
        ('Da spostare', 9),
        ('Cucina',     10),
        ('Preferite',  10);
    `);
}

export async function select<T extends DBRow>(table: string): Promise<T[]> {
    try {
        return await getDB().getAllAsync<T>(`SELECT * FROM ${table}`);
    } catch (error) {
        console.error(`SELECT error for table ${table}:`, error);
        return [];
    }
}

export async function insert<T extends DBRow>(table: string, item: Omit<T, "id">): Promise<number | undefined> {
    try {
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

        getDB().execSync(query);

        const rows: T[] = await select<T>(table);

        for (let i = rows.length - 1; i >= 0; i--) {
            const row: T = rows[i];
            let match: boolean = true;
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

export async function update<T extends DBRow>(table: string, item: T): Promise<void> {
    try {
        if (item.id === undefined) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error("Missing ID in UPDATE for web");
        }
        const updates: string = Object.entries(item)
            .filter(([key]) => key !== 'id')
            .map(([key, value]) => {
                if (typeof value === 'string')
                    return `${key} = '${value.replace(/'/g, "''")}'`;
                if (value instanceof Date)
                    return `${key} = '${value.toISOString()}'`;
                if (typeof value === 'boolean')
                    return `${key} = ${Number(value)}`;
                if (value === null || value === undefined)
                    return `${key} = NULL`;
                return `${key} = ${value}`;
            })
            .join(', ');
        const query: string = `UPDATE ${table} SET ${updates} WHERE id = ${item.id}`;

        getDB().execSync(query);
    } catch (error) {
        console.error("UPDATE error for mobile:", error);
    }
}

export async function remove(table: string, id: number): Promise<void> {
    try {
        const query: string = `DELETE FROM ${table} WHERE id = ${id};`;
        getDB().execSync(query);
    } catch (error) {
        console.error("REMOVE error for mobile:", error);
    }
}

export async function get<T extends DBRow>(table: string, id: number): Promise<T | null> {
    try {
        const results = await getDB().getAllAsync<T>(
            `SELECT * FROM ${table} WHERE id = ${id}`
        );
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error("GET error for mobile:", error);
        return null;
    }
}
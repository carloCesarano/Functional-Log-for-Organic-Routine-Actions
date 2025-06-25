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

function populateDB(db : SQLiteDatabase) : void {
    db.execSync("PRAGMA foreign_keys = ON;");
    db.execSync(`
    CREATE TABLE IF NOT EXISTS PiantePossedute (
        id           INT PRIMARY KEY AUTOINCREMENT,
        specie       TEXT NOT NULL,
        acquisizione TEXT,
        ultimaInnaff TEXT,
        ultimaPotat  TEXT,
        ultimoRinv   TEXT,
        note         TEXT,
        FOREIGN KEY (specie) REFERENCES WikiPiante (specie)
    );
    CREATE TABLE WikiPiante (
        id         INT PRIMARY KEY AUTOINCREMENT,
        specie     TEXT NOT NULL,
        nome       TEXT NOT NULL,
        freqInnaff INT NOT NULL,
        freqPotat  INT NOT NULL,
        freqRinv   INT NOT NULL
    );
    CREATE TABLE Categoria (
        id           INT PRIMARY KEY AUTOINCREMENT,
        piantaID     INT NOT NULL,
        categoria    TEXT,
        dataAggiunta TEXT,
        FOREIGN KEY (piantaID) REFERENCES PiantePossedute (id)
    )
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
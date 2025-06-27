import {SQLiteDatabase} from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import {DBRow} from "./Database";

let db: SQLiteDatabase | null = null;

function getDB(): SQLiteDatabase {
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

    db.execSync(`
    INSERT INTO Categoria (categoria) VALUES
        ('Da giardino'),
        ('Da terrazzo'),
        ('Da interno'),
        ('Da camera');
    INSERT INTO WikiPiante (specie, nome, freqInnaff, freqPotat, freqRinv) VALUES
        ('Monstera deliciosa', 'Monstera', 7, 180, 365),
        ('Ficus elastica', 'Ficus', 7, 90, 730),
        ('Strelitzia reginae', 'Uccello del paradiso', 5, 120, 365);
    INSERT INTO PiantePossedute (nome, specie, acquisizione, ultimaInnaff, ultimaPotat, ultimoRinv, note, categoria) VALUES
        ('Pianta1', 'Monstera deliciosa', '2024-01-15', '${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2,'0')}-24', '2024-01-15', '2024-02-01', 'In salotto', 'Da giardino'),
        ('Pianta2', 'Strelitzia reginae', '2025-01-15', '${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2,'0')}-22', '2025-07-15', '2026-05-01', 'Terrazzo', 'Da terrazzo'),
        ('Pianta3', 'Ficus elastica', '2025-01-15', '${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2,'0')}-25', '2025-07-15', '2026-05-01', 'Balcone', 'Da interno'),
        ('Pianta4', 'Strelitzia reginae', '2025-01-15', '${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2,'0')}-21', '2025-07-15', '2026-05-01', 'Terrazzo', 'Da camera'),
        ('Pianta5', 'Strelitzia reginae', '2025-01-15', '2025-06-20', '2025-07-15', '2026-05-01', 'Terrazzo', null),
        ('Pianta6', 'Strelitzia reginae', '2025-01-15', '2025-06-24', '2025-07-15', '2026-05-01', 'Terrazzo', null),
        ('Pianta7', 'Strelitzia reginae', '2025-01-15', '2025-06-23', '2025-07-15', '2026-05-01', 'Terrazzo', null);
    `);
}

// Funzione select corretta
export async function select<T extends DBRow>(table: string): Promise<T[]> {
    try {
        return await getDB().getAllAsync<T>(`SELECT * FROM ${table}`);
    } catch (error) {
        console.error(`SELECT error for table ${table}:`, error);
        return [];
    }
}

export async function countPlants(): Promise<number> {
    try {
        const result = await getDB().getFirstAsync<{ count: number }>(
            "SELECT COUNT(*) as count FROM PiantePossedute"
        );
        return result?.count ?? 0;
    } catch (error) {
        console.error("COUNT error for plants:", error);
        return 0;
    }
}

export async function countPlantsByCategory(): Promise<{categoria: string, count: number}[]> {
    try {
        return await getDB().getAllAsync<{categoria: string, count: number}>(`
            SELECT 
                CASE 
                    WHEN categoria IS NULL THEN 'Nessuna categoria' 
                    ELSE categoria 
                END as categoria,
                COUNT(*) as count
            FROM PiantePossedute
            GROUP BY categoria
            ORDER BY count DESC
        `);
    } catch (error) {
        console.error("COUNT by category error:", error);
        return [];
    }
}

export async function getMonthlyCareData(): Promise<{
    innaffiature: number,
    potature: number,
    rinvasi: number
}> {
    try {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const monthStr = currentMonth.toString().padStart(2, '0');
        
        return await getDB().getFirstAsync<{
            innaffiature: number,
            potature: number,
            rinvasi: number
        }>(`
            SELECT 
                SUM(CASE WHEN ultimaInnaff LIKE '${currentYear}-${monthStr}-%' THEN 1 ELSE 0 END) as innaffiature,
                SUM(CASE WHEN ultimaPotat LIKE '${currentYear}-${monthStr}-%' THEN 1 ELSE 0 END) as potature,
                SUM(CASE WHEN ultimoRinv LIKE '${currentYear}-${monthStr}-%' THEN 1 ELSE 0 END) as rinvasi
            FROM PiantePossedute
        `) || { innaffiature: 0, potature: 0, rinvasi: 0 };
    } catch (error) {
        console.error("Error fetching care data:", error);
        return { innaffiature: 0, potature: 0, rinvasi: 0 };
    }
}

export async function getPlantHealthStats(): Promise<{healthy: number, total: number}> {
    try {
        const result = await getDB().getFirstAsync<{healthy: number, total: number}>(`
            SELECT 
                SUM(CASE WHEN 
                    julianday('now') - julianday(ultimaInnaff) <= freqInnaff AND
                    julianday('now') - julianday(ultimaPotat) <= freqPotat AND 
                    julianday('now') - julianday(ultimoRinv) <= freqRinv 
                THEN 1 ELSE 0 END) as healthy,
                COUNT(*) as total
            FROM PiantePossedute
            JOIN WikiPiante ON PiantePossedute.specie = WikiPiante.specie
        `);
        return result || {healthy: 0, total: 0};
    } catch (error) {
        console.error("Error fetching health stats:", error);
        return {healthy: 0, total: 0};
    }
}

export async function getCategories(): Promise<{id: number, categoria: string}[]> {
    try {
        return await getDB().getAllAsync<{id: number, categoria: string}>(
            "SELECT id, categoria FROM Categoria"
        );
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function getPlantSpecies(): Promise<{id: number, specie: string, nome: string}[]> {
    try {
        return await getDB().getAllAsync<{id: number, specie: string, nome: string}>(
            "SELECT id, specie, nome FROM WikiPiante"
        );
    } catch (error) {
        console.error("Error fetching plant species:", error);
        return [];
    }
}

export async function getPlants(): Promise<{id: number, nome: string, specie: string}[]> {
    try {
        return await getDB().getAllAsync<{id: number, nome: string, specie: string}>(
            "SELECT id, nome, specie FROM PiantePossedute"
        );
    } catch (error) {
        console.error("Error fetching plants:", error);
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

export async function remove<T extends DBRow>(table: string, id: number): Promise<void> {
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

export async function selezionaNumeroCategorie<T extends DBRow>(): Promise<T[]> {
    try {
        return getDB().getAllAsync<T>(
            `SELECT Categoria.categoria, COUNT(PiantePossedute.id) as count 
             FROM Categoria 
             LEFT JOIN PiantePossedute ON Categoria.categoria = PiantePossedute.categoria 
             GROUP BY Categoria.categoria`
        );
    } catch (error) {
        console.error("SELECT error for mobile:", error);
        return [];
    }
}
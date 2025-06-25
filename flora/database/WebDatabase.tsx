import Dexie from "dexie";
import {DBRow} from "./Database";

let db : Dexie | null = null;

function getDB() : Dexie {
    if (!db)
        db = new Dexie("floraDB")
    populateDB(db);
    return db;
}

function populateDB(db : Dexie) : void {
    db.version(1).stores({
        piantePossedute: "++id,specie,acquisizione,ultimaInnaff,ultimaPotat,ultimoRinv,note",
        wikiPiante: '++id,specie,nome,freqInnaff,freqPotat,freqRinv',
        categoria: '++id,piantaID,categoria,dataAggiunta'
    });
}

export async function select<T extends DBRow>(table: string) : Promise<T[]> {
    try {
        return getDB().table<T>(table).toArray();
    } catch (error) {
        console.error("SELECT error for web:", error);
        return [];
    }
}

export async function insert<T extends DBRow>(table: string, item: Omit<T, "id">): Promise<number | undefined> {
    try {
        return getDB().table<T>(table).add(item as any) as unknown as number;
    } catch (error) {
        console.error("INSERT error for web:", error);
        return undefined;
    }
}

export async function update<T extends DBRow>(table: string, item: T) : Promise<void> {
    try {
        if (item.id === undefined) { // noinspection ExceptionCaughtLocallyJS
                throw new Error("Missing ID in UPDATE for web");
            }
        const {id: _, ...changes} = item;
        // @ts-ignore
        getDB().table<T>(table).update(id, changes);
    } catch (error) {
        console.error("UPDATE error for web:", error);
    }
}

export async function remove<T extends DBRow>(table: string, id: number) : Promise<void> {
    try {
        getDB().table<T>(table).delete(id);
    } catch (error) {
        console.error("REMOVE error for web:", error);
    }
}
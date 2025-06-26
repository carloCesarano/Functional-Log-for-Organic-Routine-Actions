import {Platform} from "react-native";
import * as MobileDB from './MobileDatabase';
import * as WebDB from './WebDatabase';

/**
 * Tipo base per una riga di qualsiasi tabella nel database.
 */
export type DBRow = Record<string, string | number | boolean | Date | null>;

/**
 * Determina se la piattaforma corrente è Web o Mobile.
 */
const isWeb : boolean = Platform.OS === "web";

/**
 * Seleziona il modulo database corretto in base alla piattaforma.
 */
const DB = isWeb ? WebDB : MobileDB;

/**
 * Esegue una SELECT su tutta la tabella specificata.
 *
 * @param table Nome della tabella
 * @returns Un array di righe del tipo T
 */
export async function select<T extends DBRow>(table : string) : Promise<T[]>{
    return DB.select<T>(table);
}

/**
 * Esegue una INSERT nella tabella specificata.
 *
 * @param table Nome della tabella
 * @param item Oggetto da inserire (senza campo `id`)
 * @returns Id della riga inserita, o `undefined` in caso di errore
 */
export async function insert<T extends DBRow>(table: string, item: Omit<T, "id">): Promise<number | undefined> {
    return DB.insert<T>(table, item);
}

/**
 * Esegue una UPDATE su una riga della tabella specificata.
 *
 * @param table Nome della tabella
 * @param item Oggetto con tutti i campi (incluso `id`)
 */
export async function update<T extends DBRow>(table: string, item: T) : Promise<void> {
    return DB.update<T>(table, item);
}

/**
 * Esegue una DELETE di una riga dalla tabella specificata.
 *
 * @param table Nome della tabella
 * @param id Id della riga da eliminare
 */
export async function remove<T extends DBRow>(table: string, id: number) : Promise<void> {
    return DB.remove<T>(table, id);
}

/**
 * Recupera una singola riga dalla tabella specificata tramite l'id.
 *
 * @param table Nome della tabella
 * @param id Id della riga da recuperare
 * @returns La riga trovata o `null` se non esiste
 */
export async function get<T extends DBRow>(table: string, id: number): Promise<T | null> {
    return DB.get<T>(table, id);
}

export async function selectUltimeQuattro<T extends DBRow>() : Promise<T[]> {
    return DB.selectUltimeQuattro<T>();
}
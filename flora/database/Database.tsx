import {Platform} from "react-native";
import * as MobileDB from './MobileDatabase';
import * as WebDB from './WebDatabase';

export type DBRow = Record<string, string | number | boolean | Date | null>;
const isWeb : boolean = Platform.OS === "web";
const DB = isWeb ? WebDB : MobileDB;

export async function select<T extends DBRow>(table : string) : Promise<T[]>{
    return DB.select<T>(table);
}

export async function insert<T extends DBRow>(table: string, item: Omit<T, "id">): Promise<number | undefined> {
    return DB.insert<T>(table, item);
}

export async function update<T extends DBRow>(table: string, item: T) : Promise<void> {
    return DB.update<T>(table, item);
}

export async function remove<T extends DBRow>(table: string, id: number) : Promise<void> {
    return DB.remove<T>(table, id);
}
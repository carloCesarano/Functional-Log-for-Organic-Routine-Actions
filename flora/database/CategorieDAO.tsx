import * as Database from "./Database";
import {PiantaPosseduta} from "../model/PiantaPosseduta";
import {get as pianteGet} from "./PiantePosseduteDAO";

export interface RigaTabella extends Database.DBRow {
    id        : number,
    categoria : string,
    pianta    : number
}

export async function getAll(): Promise<RigaTabella[]> {
    return await Database.select<RigaTabella>("Categorie");
}

export async function getAllCategorie(): Promise<string[]> {
    const categorieUniche = new Set<string>();

    const righe = await getAll();
    for (const riga of righe)
        categorieUniche.add(riga.categoria);

    return Array.from(categorieUniche).sort();
}

export async function get(categoria: string, pianta: PiantaPosseduta): Promise<RigaTabella | null> {
    const righe = await getAll();
    const filtered = righe.filter(riga => riga.categoria === categoria && riga.pianta === pianta.getId());
    if (filtered.length > 0)
        return filtered[0]
    return null;
}

export async function insert(categoria: string, pianta: PiantaPosseduta): Promise<void> {
    if (await get(categoria, pianta) !== null)
        throw new Error("Categoria già presente per quella pianta")

    const nuovoID = await Database.insert<RigaTabella>("Categorie", {categoria: categoria, pianta: pianta.getId()});
    if (nuovoID === undefined)
        throw new Error("Insert error");
}

export async function remove(categoria: string, pianta: PiantaPosseduta): Promise<void> {
    const riga = await get(categoria, pianta);
    if (riga === null)
        throw new Error("Categoria non presente per quella pianta");
    await Database.remove("Categorie", riga.id);
}

export async function update(nomeVecchio: string, nomeNuovo: string): Promise<void> {
    const tabella = await getAll();
    const filtered = tabella.filter(riga => riga.categoria === nomeVecchio);
    await Promise.all(filtered.map(async riga => {
        riga.categoria = nomeNuovo;
        await Database.update<RigaTabella>("Categorie", riga);
    }));
}
export async function filtraPerCategoria(categoria: string): Promise<PiantaPosseduta[]> {
    const tabella = await getAll();
    const filtered = tabella.filter(riga => riga.categoria === categoria);
    return await Promise.all(filtered.map(riga => pianteGet(riga.pianta)));
}

export async function filtraPerPianta(pianta: PiantaPosseduta): Promise<string[]> {
    const tabella = await getAll();
    const filtered = tabella.filter(riga => riga.pianta === pianta.getId())
    return filtered.map(riga => riga.categoria);
}

export async function contaPerCategoria(): Promise<{categoria: string, conteggio: number}[]> {
    const conteggioMap = new Map<string, number>();

    const tabella = await getAll();
    for (const riga of tabella)
        conteggioMap.set(riga.categoria, (conteggioMap.get(riga.categoria) || 0) + 1);

    const risultato: {categoria: string, conteggio: number}[] = [];
    for (const [categoria, conteggio] of conteggioMap.entries())
        risultato.push({categoria, conteggio});

    return risultato;
}
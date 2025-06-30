import * as Database from "./Database";
import {WikiPianta} from "../model/WikiPianta";

/**
 * Rappresenta una riga della tabella "WikiPiante"
 */
export interface RigaTabella extends Database.DBRow {
    id:         number,
    specie:     string,
    freqInnaff: number,
    freqPotat:  number,
    freqRinv:   number,
    foto:       string
}

export async function getAll(): Promise<WikiPianta[]> {
    const risultatoQuery: RigaTabella[] = await Database.select<RigaTabella>("WikiPiante");
    return await Promise.all(risultatoQuery.map(riga => generaWikiDaRiga(riga)));
}

export async function insert(wiki: WikiPianta): Promise<void> {
    const {id, ...rigaSenzaId} = generaRigaDaWiki(wiki);
    const idInserito = await Database.insert<RigaTabella>("WikiPiante", rigaSenzaId);

    if (idInserito !== undefined)
        wiki.id = idInserito;
    else
        throw new Error("Insert fallito");
}

export async function update(wiki: WikiPianta): Promise<void> {
    await Database.update<RigaTabella>("WikiPiante", generaRigaDaWiki(wiki));
}

export async function remove(wiki: WikiPianta): Promise<void> {
    await Database.remove("WikiPiante", wiki.getId());
}

export async function get(specie: string): Promise<WikiPianta> {
    const tabella: WikiPianta[] = await getAll();
    const filtered: WikiPianta[] = tabella.filter(wiki => wiki.getSpecie() === specie);
    if (filtered.length !== 1)
        throw new Error("Get fallito");
    return filtered[0];
}

export function generaWikiDaRiga(riga: RigaTabella): WikiPianta {
    return new WikiPianta(riga);
}

export function generaRigaDaWiki(wiki: WikiPianta): RigaTabella {
    return {
        id:         wiki.getId(),
        specie:     wiki.getSpecie(),
        freqInnaff: wiki.getFreqInnaff(),
        freqPotat:  wiki.getFreqPotat(),
        freqRinv:   wiki.getFreqRinv(),
        foto:       wiki.getFotoPath()
    };
}
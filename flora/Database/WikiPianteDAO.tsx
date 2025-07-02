import * as DAO from './DAO';
import {WikiPianta} from "../Model/WikiPianta";

export interface Riga extends DAO.Riga {
    id         : number,
    specie     : string,
    freqInnaff : number,
    freqPotat  : number,
    freqRinv   : number,
    foto       : string | null,
}

export async function getAll(): Promise<WikiPianta[]> {
    const tabella: Riga[] = await DAO.getAll<Riga>('WikiPiante');
    return tabella.map(riga => new WikiPianta(riga));
}

export async function get(specie: string): Promise<WikiPianta> {
    const risultati: Riga[] = await DAO.get<Riga>('WikiPiante', {specie: specie});

    if (risultati.length !== 1)
        throw new Error(`GET(WikiPiante, ${specie}) FALLITO`);

    return new WikiPianta(risultati[0]);
}

export async function insert(wiki: WikiPianta): Promise<number | null> {
    try {
        return await DAO.insert<Riga>('WikiPiante', preparaPerInsert(wiki));
    } catch (error) {
        return null;
    }
}

export async function update(wiki: WikiPianta): Promise<void> {
    await DAO.update<Riga>('WikiPiante', preparaPerUpdate(wiki));
}

export async function remove(wiki: WikiPianta): Promise<void> {
    await DAO.remove('WikiPiante', wiki.getId());
}

function preparaPerUpdate(w: WikiPianta): Riga {
    return {
        id         : w.getId(),
        specie     : w.getSpecie(),
        freqInnaff : w.getFreqInnaff(),
        freqPotat  : w.getFreqPotat(),
        freqRinv   : w.getFreqRinv(),
        foto       : w.foto,
    }
}

function preparaPerInsert(w: WikiPianta): Omit<Riga, 'id'> {
    return {
        specie     : w.getSpecie(),
        freqInnaff : w.getFreqInnaff(),
        freqPotat  : w.getFreqPotat(),
        freqRinv   : w.getFreqRinv(),
        foto       : w.foto,
    }
}
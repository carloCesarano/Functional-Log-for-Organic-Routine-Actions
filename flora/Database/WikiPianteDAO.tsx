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
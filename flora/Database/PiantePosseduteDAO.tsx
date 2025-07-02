import * as DAO from './DAO';
import {PiantaPosseduta} from '../Model/PiantaPosseduta';
import {insert as InterventiInsert} from './InterventiDAO';

export interface Riga extends DAO.Riga {
    id: number,
    nome: string,
    specie: string,
    acq: string,
    note: string | null,
    foto: string | null
}

export async function getAll(): Promise<PiantaPosseduta[]> {
    const tabella = await DAO.getAll<Riga>('PiantePossedute');
    return Promise.all(tabella.map(riga => PiantaPosseduta.daRiga(riga)))
}

export async function get(id: number): Promise<PiantaPosseduta> {
    const risultati: Riga[] = await DAO.get<Riga>('PiantePossedute', {id: id});

    if (risultati.length !== 1)
        throw new Error(`GET(PiantePossedute, ${id}) FALLITO`);

    return await PiantaPosseduta.daRiga(risultati[0]);
}

export async function insert(pianta: PiantaPosseduta): Promise<void> {
    pianta.id = await DAO.insert<Riga>('PiantePossedute', preparaPerInsert(pianta));
    await InterventiInsert(pianta, 'INN', pianta.getInnaff()[0]);
    await InterventiInsert(pianta, 'POT', pianta.getPotat()[0]);
    await InterventiInsert(pianta, 'RINV', pianta.getRinv()[0]);
}

export async function remove(pianta: PiantaPosseduta): Promise<void> {
    await DAO.remove('PiantePossedute', pianta.getId());
}

export async function update(pianta: PiantaPosseduta): Promise<void> {
    await DAO.update<Riga>('PiantePossedute', preparaPerUpdate(pianta));
}

function preparaPerInsert(pianta: PiantaPosseduta): Omit<Riga, 'id'> {
    return {
        nome: pianta.getNome(),
        specie: pianta.getSpecie().getSpecie(),
        acq: pianta.getAcq().toISOString(),
        note: pianta.getNote(),
        foto: pianta.foto ?? ''
    };
}

function preparaPerUpdate(pianta: PiantaPosseduta): Riga {
    return {
        id: pianta.getId(),
        nome: pianta.getNome(),
        specie: pianta.getSpecie().getSpecie(),
        acq: pianta.getAcq().toISOString(),
        note: pianta.getNote(),
        foto: pianta.foto ?? ''
    };
}
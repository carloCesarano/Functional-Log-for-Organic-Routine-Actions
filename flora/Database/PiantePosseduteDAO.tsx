import * as DAO from './DAO';
import {PiantaPosseduta} from '../Model/PiantaPosseduta';
import * as CatDAO from './PianteCategorieDAO';
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

    // DISTRUGGI LE CATEGORIE PRECEDENTI
    const vecchie: CatDAO.Riga[] = await CatDAO.getAll();
    const daRimuovere: CatDAO.Riga[] = vecchie.filter(r => r.pianta === pianta.getId())
    await Promise.all(daRimuovere.map(riga => CatDAO.remove(riga.id)));
    // INSERISCI LE NUOVE
    const nuove: string[] = pianta.getCategorie();
    await Promise.all(nuove.map(cat => CatDAO.insert(pianta, cat)));
}

function preparaPerInsert(pianta: PiantaPosseduta): Omit<Riga, 'id'> {
    return {
        nome: pianta.getNome(),
        specie: pianta.getSpecie().getSpecie(),
        acq: pianta.getAcq().toISOString().split('T')[0],
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
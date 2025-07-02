import * as DAO from './DAO';
import {PiantaPosseduta} from "../Model/PiantaPosseduta";

export interface Riga extends DAO.Riga {
    id: number,
    pianta: number,
    tipo: string,
    data: string
}

export async function getAll(): Promise<Riga[]> {
    return await DAO.getAll<Riga>('Interventi');
}

export async function getPerPianta(idPianta: number): Promise<{tipo: string, data: Date}[]> {
    const risultati: Riga[] = await DAO.get<Riga>('Interventi', {pianta: idPianta});
    return risultati.map(riga => {return {tipo: riga.tipo, data: new Date(riga.data)}})
}

export async function insert(pianta: PiantaPosseduta, tipo: string, data: Date): Promise<void> {
    if (!['INN', 'POT', 'RINV'].includes(tipo))
        throw new SyntaxError(`Intervento ${tipo} non contenuto in [INN, POT, RINV]`)
    const riga: Omit<Riga, 'id'> = {
        pianta: pianta.getId(),
        tipo: tipo,
        data: data.toISOString()
    };
    await DAO.insert<Riga>('Interventi', riga);
}

export async function remove(id: number): Promise<void> {
    await DAO.remove('Interventi', id);
}

export async function update(riga: Riga): Promise<void> {
    await DAO.update<Riga>('Interventi', riga);
}
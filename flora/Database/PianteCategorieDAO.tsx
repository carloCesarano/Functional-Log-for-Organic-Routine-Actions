import * as DAO from './DAO';
import * as CategorieDAO from './CategorieDAO';
import {PiantaPosseduta} from '../Model/PiantaPosseduta';

export interface Riga extends DAO.Riga {
    id: number,
    pianta: number,
    categoria: number
}

export async function getAll(): Promise<Riga[]> {
    return await DAO.getAll<Riga>('PianteCategorie');
}

export async function getPerPianta(idPianta: number): Promise<string[]> {
    const risultati: Riga[] = await DAO.get<Riga>('PianteCategorie', {pianta: idPianta});
    const idCategorie: number[] = risultati.map(riga => riga.categoria);
    return Promise.all(idCategorie.map(id => CategorieDAO.get(id)))
}

export async function insert(pianta: PiantaPosseduta, categoria: string): Promise<number | null> {
    const riga: Omit<Riga, 'id'> = {
        pianta: pianta.getId(),
        categoria: await CategorieDAO.daNome(categoria)
    };
    try {
        return await DAO.insert<Riga>('PianteCategorie', riga);
    } catch (error) {
        console.error('[PianteCategorieDAO] insert error:', error);
        return null;
    }
}

export async function remove(id: number): Promise<void> {
    await DAO.remove('PianteCategorie', id);
}

export async function update(riga: Riga): Promise<void> {
    await DAO.update<Riga>('PianteCategorie', riga);
}
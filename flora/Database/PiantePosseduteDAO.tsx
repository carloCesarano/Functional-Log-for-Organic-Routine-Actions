import * as DAO from './DAO';

export interface Riga extends DAO.Riga {
    id: number,
    nome: string,
    specie: string,
    acq: string,
    note: string | null,
    foto: string | null
}
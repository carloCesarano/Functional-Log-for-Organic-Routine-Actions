import * as DAO from './DAO';

export interface Riga extends DAO.Riga {
    id: number,
    nome: string
}

export async function getAll(): Promise<Riga[]> {
    return await DAO.getAll<Riga>('Categorie');
}

export async function get(id: number): Promise<string> {
    const risultati: Riga[] = await DAO.get<Riga>('Categorie', {id: id});

    if (risultati.length !== 1)
        throw new Error(`GET(Categorie, ${id}) FALLITO`);

    return (risultati)[0].nome;
}

export async function daNome(nome: string): Promise<number> {
    const risultati: Riga[] = await DAO.get<Riga>('Categorie', {nome: nome});

    if (risultati.length !== 1)
        throw new Error(`GET(Categorie, ${nome}) FALLITO`);

    return (risultati)[0].id;
}

export async function insert(nome: string): Promise<number | null> {
    try {
        return await DAO.insert<Riga>('Categorie', {nome});
    } catch (error) {
        return null;
    }
}

export async function update({vecchio, nuovo}: {vecchio: string, nuovo: string}): Promise<void> {
    const riga = {
        id: await daNome(vecchio),
        nome: nuovo
    };
    await DAO.update<Riga>('Categorie', riga);
}

export async function remove(nome: string): Promise<void> {
    const id: number = await daNome(nome);
    await DAO.remove('Categorie', id);
}
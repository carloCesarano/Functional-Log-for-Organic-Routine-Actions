import * as Database from "./Database";
import {PiantaPosseduta} from "../model/PiantaPosseduta";
import {WikiPianta} from "../model/WikiPianta";

/**
 * Rappresenta una riga della tabella "PiantePossedute" del database
 */
interface Props extends Database.DBRow {
    id           : number;
    nome         : string;
    specie       : string;
    acquisizione : Date;
    ultimaInnaff : Date;
    ultimaPotat  : Date;
    ultimoRinv   : Date;
    note         : string;
    foto         : string;
}

/**
 * Recupera tutte le piante possedute dal database,
 * arricchite con le informazioni della WikiPianta.
 *
 * @returns Lista delle piante possedute
 */
export async function getAll(): Promise<PiantaPosseduta[]> {
    const risultatoQuery : Props[] = await Database.select<Props>("PiantePossedute");
    return await Promise.all(risultatoQuery.map(riga => generaPiantaDaRiga(riga)))
}

/**
 * Inserisce una nuova pianta nel database e aggiorna
 * il suo ID di conseguenza.
 *
 * @param pianta Oggetto pianta da inserire
 * @throws Error Se l'inserimento fallisce
 */
export async function insert(pianta: PiantaPosseduta): Promise<void> {
    const riga : Omit<Props, "id"> = pianta.toProps();
    const idInserito = await Database.insert<Props>("PiantePossedute", riga);
    if (idInserito !== undefined)
        pianta.id = idInserito;
    else
        throw new Error("Insert fallito");
}

/**
 * Aggiorna una pianta esistente nel database,
 * basandosi sul suo ID.
 *
 * @param pianta Oggetto pianta da aggiornare
 */
export async function update(pianta: PiantaPosseduta): Promise<void> {
    await Database.update<Props>("PiantePossedute", pianta.toProps());
}

/**
 * Rimuove una pianta dal database, basandosi sul suo ID.
 *
 * @param pianta Oggetto pianta da eliminare
 */
export async function remove(pianta: PiantaPosseduta): Promise<void> {
    await Database.remove<Props>("PiantePossedute", pianta.getId());
}

/**
 * Recupera una singola pianta dato il suo ID.
 *
 * @param id ID della pianta da recuperare
 * @returns Istanza della pianta
 * @throws Error Se la pianta non esiste
 */
export async function get(id: number): Promise<PiantaPosseduta> {
    const riga: Props | null = await Database.get<Props>("PiantePossedute", id);
    if (riga === null)
        throw new Error("Get fallito");
    return await generaPiantaDaRiga(riga);
}

/**
 * Conta il numero totale di piante possedute.
 *
 * @returns Numero totale di piante
 */
export async function contaTutte(): Promise<number> {
    const piante: PiantaPosseduta[] = await getAll();
    return piante.length;
}

const wikiCache: Record<string, WikiPianta> = {};

/**
 * Costruisce un oggetto PiantaPosseduta partendo da una
 * riga del database, arricchendola con le frequenze
 * prese da WikiPianta. Usa una cache per evitare chiamate
 * ripetute per la stessa specie.
 *
 * @param riga Riga del database da convertire
 * @returns Oggetto PiantaPosseduta completo
 * @throws Error Se la specie non è presente nel database
 */
async function generaPiantaDaRiga(riga: Props) : Promise<PiantaPosseduta> {
    let wiki : WikiPianta | null = wikiCache[riga.specie];
    if (!wiki) {
        wiki = await WikiPianta.daSpecie(riga.specie);
        if (!(wiki instanceof WikiPianta))
            throw new Error("Unknown species")
        wikiCache[riga.specie] = wiki;
    }

    const pianta = new PiantaPosseduta(riga);
    pianta.freqInnaff = wiki.getFreqInnaff();
    pianta.freqRinv   = wiki.getFreqRinv();
    pianta.freqPotat  = wiki.getFreqPotat();

    return pianta;
}
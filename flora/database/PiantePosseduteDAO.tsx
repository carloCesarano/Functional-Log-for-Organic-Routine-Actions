import * as Database from "./Database";
import {filtraPerPianta} from "./CategorieDAO";
import {PiantaPosseduta} from "../model/PiantaPosseduta";
import {WikiPianta} from "../model/WikiPianta";
import {get as WikiGet} from "./WikiPianteDAO";

/**
 * Rappresenta una riga della tabella "PiantePossedute" del database
 */
export interface RigaTabella extends Database.DBRow {
    id           : number;
    specie       : string;
    nome         : string;
    dataAcq      : string;
    ultimaInnaff : string;
    ultimaPotat  : string;
    ultimoRinv   : string;
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
    const risultatoQuery : RigaTabella[] = await Database.select<RigaTabella>("PiantePossedute");
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
    const { id, ...rigaSenzaId } = generaRigaDaPianta(pianta);
    const idInserito = await Database.insert("PiantePossedute", rigaSenzaId);

    if (idInserito !== undefined)
        pianta.id = idInserito;
    else {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error("Insert fallito");
    }
}

/**
 * Aggiorna una pianta esistente nel database,
 * basandosi sul suo ID.
 *
 * @param pianta Oggetto pianta da aggiornare
 */
export async function update(pianta: PiantaPosseduta): Promise<void> {
    await Database.update<RigaTabella>("PiantePossedute", generaRigaDaPianta(pianta));
}

/**
 * Rimuove una pianta dal database, basandosi sul suo ID.
 *
 * @param pianta Oggetto pianta da eliminare
 */
export async function remove(pianta: PiantaPosseduta): Promise<void> {
    await Database.remove("PiantePossedute", pianta.getId());
}

/**
 * Recupera una singola pianta dato il suo ID.
 *
 * @param id ID della pianta da recuperare
 * @returns Istanza della pianta
 * @throws Error Se la pianta non esiste
 */
export async function get(id: number): Promise<PiantaPosseduta> {
    const riga: RigaTabella | null = await Database.get<RigaTabella>("PiantePossedute", id);
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
export async function generaPiantaDaRiga(riga: RigaTabella) : Promise<PiantaPosseduta> {
    let wiki : WikiPianta | null = wikiCache[riga.specie];
    if (!wiki) {
        wiki = await WikiGet(riga.specie);
        wikiCache[riga.specie] = wiki;
    }

    const pianta = new PiantaPosseduta(riga);

    pianta.freqInnaff = wiki.getFreqInnaff();
    pianta.freqRinv   = wiki.getFreqRinv();
    pianta.freqPotat  = wiki.getFreqPotat();
    pianta.categorie = await filtraPerPianta(pianta);

    return pianta;
}

/**
 * Costruisce un oggetto RigaTabella utile per la
 * comunicazione col database, partendo da un oggetto
 * PiantaPosseduta.
 *
 * @param pianta Oggetto PiantaPosseduta da convertire
 * @returns Oggetto RigaTabella
 */
export function generaRigaDaPianta(pianta: PiantaPosseduta): RigaTabella {
    return {
        id           : pianta.getId(),
        nome         : pianta.getNome(),
        specie       : pianta.getSpecie(),
        dataAcq      : pianta.getDataAcq().toISOString(),
        ultimaInnaff : pianta.getUltimaInnaff().toISOString(),
        ultimaPotat  : pianta.getUltimaPotat().toISOString(),
        ultimoRinv   : pianta.getUltimoRinv().toISOString(),
        foto         : pianta.getFotoPath(),
        note         : pianta.getNote(),
    }
}
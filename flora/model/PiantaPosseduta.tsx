import * as Database from "../database/Database";
import {WikiPianta} from "./WikiPianta";

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

export class PiantaPosseduta {
    private id           : number | undefined;
    private nome         : string;
    private specie       : string;
    private dataAcq      : Date;
    private freqInnaff   : number | undefined;
    private ultimaInnaff : Date;
    private freqPotat    : number | undefined;
    private ultimaPotat  : Date;
    private freqRinv     : number | undefined;
    private ultimoRinv   : Date;
    private foto         : string;
    private note         : string;

    /**
     * Costruisce un'istanza di PiantaPosseduta da una riga di
     * database.
     *
     * @param riga Oggetto con i dati della pianta
     */
    constructor(riga: Props) {
        this.id = riga.id;
        this.nome = riga.nome;
        this.specie = riga.specie;
        this.dataAcq = riga.acquisizione;
        this.freqInnaff = 1000;
        this.ultimaInnaff = riga.ultimaInnaff;
        this.freqPotat = 1000;
        this.ultimaPotat = riga.ultimaPotat;
        this.freqRinv = 1000;
        this.ultimoRinv = riga.ultimoRinv;
        this.foto = riga.foto;
        this.note = riga.note;
    }

    /** @returns Id della pianta, -1 se non definito */
    getId()           : number { return this.id ?? -1           }
    /** @returns Nome della pianta */
    getNome()         : string { return this.nome               }
    /** @returns Specie della pianta */
    getSpecie()       : string { return this.specie             }
    /** @returns Data di acquisizione della pianta */
    getDataAcq()      : Date   { return this.dataAcq            }
    /** @returns Ultima data di innaffiatura */
    getUltimaInnaff() : Date   { return this.ultimaInnaff       }
    /** @returns Frequenza in giorni per innaffiatura, default 1000 */
    getFreqInnaff()   : number { return this.freqInnaff ?? 1000 }
    /** @returns Ultima data di potatura */
    getUltimaPotat()  : Date   { return this.ultimaPotat        }
    /** @returns Frequenza in giorni per potatura, default 1000 */
    getFreqPotat()    : number { return this.freqPotat  ?? 1000 }
    /** @returns Ultima data di rinvaso */
    getUltimoRinv()   : Date   { return this.ultimoRinv         }
    /** @returns Frequenza in giorni per rinvaso, default 1000 */
    getFreqRinv()     : number { return this.freqRinv   ?? 1000 }
    /** @returns Percorso della foto collegata */
    getFoto()         : string { return this.foto               }
    /** @returns Note aggiuntive */
    getNote()         : string { return this.note               }

    /**
     * Crea una nuova pianta e la inserisce nel database.
     *
     * @param riga Dati completi della pianta da creare
     * @returns Istanza della istanza con id aggiornato
     * @throws {Error} Se la specie non è riconosciuta
     */
    static async creaNuova(riga: Props) : Promise<PiantaPosseduta> {
        const pianta = new PiantaPosseduta(riga);
        const wiki = await WikiPianta.daSpecie(pianta.specie);

        if (!(wiki instanceof WikiPianta)) throw new Error("Unknown species");

        pianta.freqInnaff = wiki.getFreqInnaff();
        pianta.freqPotat = wiki.getFreqPotat();
        pianta.freqRinv = wiki.getFreqRinv();

        const {id: _, ...senzaId} = riga;
        const nuovoId : number | undefined = await Database.insert<Props>("PiantePossedute", senzaId);
        pianta.id = nuovoId ?? -1;

        return pianta;
    }

    /**
     * Carica una pianta dal database dato il suo id.
     *
     * @param id Id della pianta
     * @return Istanza della pianta o null se non trovata
     */
    static async daID(id: number): Promise<PiantaPosseduta | null> {
        const riga = await Database.get<Props>('PiantePossedute', id);
        return riga ? new PiantaPosseduta(riga) : null;
    }

    /*  Restituisce il numero di giorni che mancano
     *  alla prossima innaffiatura. Nel caso il numero
     *  sia <=0, allora la pianta è 'Da innaffiare'.
     */
    giorniAllaProssimaInnaff() : number {
        if (this.freqInnaff === undefined) return NaN;
        const oggi = new Date();
        const prossima = new Date(this.ultimaInnaff);
        prossima.setDate(prossima.getDate() + this.freqInnaff);
        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24))
    }

    /*  Restituisce il numero di giorni che mancano
     *  alla prossima potatura. Nel caso il numero
     *  sia <=0, allora la pianta è 'Da potare'.
     */
    giorniAllaProssimaPotat() : number {
        if (this.freqPotat === undefined) return NaN;
        const oggi = new Date();
        const prossima = new Date(this.ultimaPotat);
        prossima.setDate(prossima.getDate() + this.freqPotat);
        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24))
    }

    /*  Restituisce il numero di giorni che mancano
     *  al prossimo rinvaso. Nel caso il numero
     *  sia <=0, allora la pianta è 'Da rinvasare'.
     */
    giorniAlProssimoRinv() : number {
        if (this.freqRinv === undefined) return NaN;
        const oggi = new Date();
        const prossima = new Date(this.ultimoRinv);
        prossima.setDate(prossima.getDate() + this.freqRinv);
        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24))
    }

    /**
     * Calcola lo stato di salute della pianta da 0 (pessima)
     * a 1 (perfetta), basandosi sui giorni mancanti per
     * innaffiatura, potatura e rinvaso.
     *
     * @returns Stato normalizzato tra 0 e 1
     */
    stato(): number {
        function normalizza(giorni: number): number {
            if (giorni <= -10) return 0;
            if (giorni >= 0) return 1;
            return giorni/10 + 1;
        }

        const innaff = normalizza(this.giorniAllaProssimaInnaff());
        const potat = normalizza(this.giorniAllaProssimaPotat());
        const rinv = normalizza(this.giorniAlProssimoRinv());
        const valori = [innaff, potat, rinv].filter(v => !isNaN(v));
        if (valori.length === 0) return 0;
        return valori.reduce((a, b) => a + b, 0) / valori.length;
    }

    /**
     * Restituisce tutte le piante possedute presenti
     * nel database.
     *
     * @returns Array di istanze di PiantaPosseduta
     */
    static async getAllPiante(): Promise<PiantaPosseduta[]> {
        const risultatoQuery = await Database.select<Props>("PiantePossedute");
        const risultato : PiantaPosseduta[] = [];

        for (const riga of risultatoQuery) {
            const pianta = await this.creaNuova(riga);
            risultato.push(pianta);
        }

        return risultato;
    }

}
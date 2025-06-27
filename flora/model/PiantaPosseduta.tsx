import {RigaTabella, insert, generaPiantaDaRiga} from "../database/PiantePosseduteDAO";

export class PiantaPosseduta {
    id           : number | undefined;
    nome         : string;
    specie       : string;
    dataAcq      : Date;
    freqInnaff   : number | undefined;
    ultimaInnaff : Date;
    freqPotat    : number | undefined;
    ultimaPotat  : Date;
    freqRinv     : number | undefined;
    ultimoRinv   : Date;
    foto         : string;
    note         : string;

    /**
     * Costruisce un'istanza di PiantaPosseduta da una riga di
     * database.
     *
     * @param riga Oggetto con i dati della pianta
     */
    constructor(riga: RigaTabella) {
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
    static async creaNuova(riga: RigaTabella) : Promise<PiantaPosseduta> {
        const pianta = await generaPiantaDaRiga(riga);
        await insert(pianta);
        return pianta;
    }

    /*  Restituisce il numero di giorni che mancano
     *  alla prossima innaffiatura. Nel caso il numero
     *  sia <=0, allora la pianta è 'Da innaffiare'.
     */
    giorniAllaProssimaInnaff() : number {
        const oggi = new Date();
        const prossima = new Date(this.ultimaInnaff);
        prossima.setDate(prossima.getDate() + this.getFreqInnaff());
        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24))
    }

    /*  Restituisce il numero di giorni che mancano
     *  alla prossima potatura. Nel caso il numero
     *  sia <=0, allora la pianta è 'Da potare'.
     */
    giorniAllaProssimaPotat() : number {
        const oggi = new Date();
        const prossima = new Date(this.ultimaPotat);
        prossima.setDate(prossima.getDate() + this.getFreqPotat());
        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24))
    }

    /*  Restituisce il numero di giorni che mancano
     *  al prossimo rinvaso. Nel caso il numero
     *  sia <=0, allora la pianta è 'Da rinvasare'.
     */
    giorniAlProssimoRinv() : number {
        const oggi = new Date();
        const prossima = new Date(this.ultimoRinv);
        prossima.setDate(prossima.getDate() + this.getFreqRinv());
        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24))
    }

    LIMITE_INNAFF : number = 3;
    LIMITE_POTAT  : number = 14;
    LIMITE_RINV   : number = 30;

    /**
     * Calcola lo stato di salute della pianta da 0 (pessima)
     * a 1 (perfetta), basandosi sui giorni mancanti per
     * innaffiatura, potatura e rinvaso.
     *
     * @returns Stato normalizzato tra 0 e 1
     */
    stato(): number {
        function normalizza(giorni: number, limiteCritico: number): number {
            if (giorni <= -limiteCritico) return 0;
            if (giorni >= 0) return 1;
            return giorni/10 + 1;
        }

        const innaff = normalizza(this.giorniAllaProssimaInnaff(), this.LIMITE_INNAFF);
        const potat = normalizza(this.giorniAllaProssimaPotat(), this.LIMITE_POTAT);
        const rinv = normalizza(this.giorniAlProssimoRinv(), this.LIMITE_RINV);
        const valori = [innaff, potat, rinv].filter(v => !isNaN(v));
        if (valori.length === 0) return 0;
        return valori.reduce((a, b) => a + b, 0) / valori.length;
    }

}
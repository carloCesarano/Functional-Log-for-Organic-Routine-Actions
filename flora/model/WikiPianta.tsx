import * as Database from "../database/Database";

interface Props extends Database.DBRow {
    id         : number,
    specie     : string,
    nome       : string,
    freqInnaff : number,
    freqPotat  : number,
    freqRinv   : number
}

export class WikiPianta {
    private id         : number;
    private specie     : string;
    private nome       : string;
    private freqInnaff : number;
    private freqPotat  : number;
    private freqRinv   : number;

    /**
     * Costruisce un'istanza di WikiPianta da una riga del database.
     * @param riga Dati della pianta
     */
    constructor(riga: Props) {
        this.id         = riga.id;
        this.specie     = riga.specie;
        this.nome       = riga.nome;
        this.freqInnaff = riga.freqInnaff;
        this.freqPotat  = riga.freqPotat;
        this.freqRinv   = riga.freqRinv;
    }

    /** @returns Id della specie */
    getId()         : number { return this.id         }
    /** @returns Specie botanica */
    getSpecie()     : string { return this.specie     }
    /** @returns Nome comune */
    getNome()       : string { return this.nome       }
    /** @returns Frequenza innaffiatura (giorni) */
    getFreqInnaff() : number { return this.freqInnaff }
    /** @returns Frequenza potatura (giorni) */
    getFreqPotat()  : number { return this.freqPotat  }
    /** @returns Frequenza rinvaso (giorni) */
    getFreqRinv()   : number { return this.freqRinv   }

    /**
     * Recupera la pianta dalla specie.
     * @param specie Specie della pianta
     * @returns Istanza di WikiPianta o null se non trovata
     */
    static async daSpecie(specie: string): Promise<WikiPianta | null> {
        const wiki = await Database.select<Props>("WikiPiante");
        const filtered = wiki.filter(p => p.specie === specie);
        return (filtered.length === 0) ? null : new WikiPianta(filtered[0]);
    }

    /**
     * Recupera la specie dall'id.
     * @param id Id della specie
     * @returns Istanza di WikiPianta o null se non trovata
     */
    static async daID(id: number): Promise<WikiPianta | null> {
        const riga = await Database.get<Props>("WikiPiante", id);
        return riga ? new WikiPianta(riga) : null;
    }

}
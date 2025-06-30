import * as Database from "../database/Database";

export const IMAGE_MOCKUPS : {[key: string]: any} = {
    "mockup:generic"     : require("../assets/plantsMockup/generic.png"    ),
    "mockup:Ficus"       : require("../assets/plantsMockup/FICUS.webp"     ),
    "mockup:Sanseveria"  : require("../assets/plantsMockup/SANSEVERIA.jpg" ),
    "mockup:Pothos"      : require("../assets/plantsMockup/POTHOS.jpg"     ),
    "mockup:Zamioculca"  : require("../assets/plantsMockup/ZAMIOCULCA.jpg" ),
    "mockup:Spatifillo"  : require("../assets/plantsMockup/SPATIFILLO.jpg" ),
    "mockup:Orchidea"    : require("../assets/plantsMockup/ORCHIDEA.jpg"   ),
    "mockup:Anthurium"   : require("../assets/plantsMockup/ANTHURIUM.jpg"  ),
    "mockup:Begonia"     : require("../assets/plantsMockup/BEGONIA.jpg"    ),
    "mockup:Basilico"    : require("../assets/plantsMockup/BASILICO.webp"  ),
    "mockup:Peperoncino" : require("../assets/plantsMockup/PEPERONCINO.jpg")
}

interface Props extends Database.DBRow {
    id         : number,
    specie     : string,
    freqInnaff : number,
    freqPotat  : number,
    freqRinv   : number,
    foto       : string,
}

export class WikiPianta {
    id         : number;
    specie     : string;
    freqInnaff : number;
    freqPotat  : number;
    freqRinv   : number;
    foto       : string;

    /**
     * Costruisce un'istanza di WikiPianta da una riga del database.
     * @param riga Dati della pianta
     */
    constructor(riga: Props) {
        this.id         = riga.id;
        this.specie     = riga.specie;
        this.freqInnaff = riga.freqInnaff;
        this.freqPotat  = riga.freqPotat;
        this.freqRinv   = riga.freqRinv;
        this.foto       = riga.foto;
    }

    /** @returns Id della specie */
    getId()         : number { return this.id         }
    /** @returns Nome comune */
    getSpecie()     : string { return this.specie     }
    /** @returns Frequenza innaffiatura (giorni) */
    getFreqInnaff() : number { return this.freqInnaff }
    /** @returns Frequenza potatura (giorni) */
    getFreqPotat()  : number { return this.freqPotat  }
    /** @returns Frequenza rinvaso (giorni) */
    getFreqRinv()   : number { return this.freqRinv   }
    /** @returns Path della foto generica */
    getFotoPath()   : string { return this.foto       }

    /** @returns Istanza della foto generica */
    getFoto() : any {
        return IMAGE_MOCKUPS['mockup:' + this.getSpecie()]
            ?? {uri: this.getFotoPath()}
            ?? IMAGE_MOCKUPS["mockup:generic"];
    }

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

}
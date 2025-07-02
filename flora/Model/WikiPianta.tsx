import {Riga, get} from '../Database/WikiPianteDAO';

export const IMAGE_MOCKUPS : {[key: string]: number} = {
    "mockup:generic"     : require('../Assets/MOCKUP/generic.jpg'    ),
    "mockup:Ficus"       : require('../Assets/MOCKUP/FICUS.webp'     ),
    "mockup:Sanseveria"  : require('../Assets/MOCKUP/SANSEVERIA.jpg' ),
    "mockup:Pothos"      : require('../Assets/MOCKUP/POTHOS.jpg'     ),
    "mockup:Zamioculca"  : require('../Assets/MOCKUP/ZAMIOCULCA.jpg' ),
    "mockup:Spatifillo"  : require('../Assets/MOCKUP/SPATIFILLO.jpg' ),
    "mockup:Orchidea"    : require('../Assets/MOCKUP/ORCHIDEA.jpg'   ),
    "mockup:Anthurium"   : require('../Assets/MOCKUP/ANTHURIUM.jpg'  ),
    "mockup:Begonia"     : require('../Assets/MOCKUP/BEGONIA.jpg'    ),
    "mockup:Basilico"    : require('../Assets/MOCKUP/BASILICO.webp'  ),
    "mockup:Peperoncino" : require('../Assets/MOCKUP/PEPERONCINO.jpg')
}

export class WikiPianta {
    id         : number;
    specie     : string;
    freqInnaff : number;
    freqPotat  : number;
    freqRinv   : number;
    foto       : string | null;

    /**
     * Costruisce un'istanza di WikiPianta da una riga del database.
     * @param riga Dati della pianta
     */
    constructor(riga: Riga) {
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
    /** @returns Istanza della foto generica */
    getFoto() : number | {uri: string} {
        const mockupKey = 'mockup:' + this.getSpecie();
        if (this.foto)
            return {uri: this.foto};
        if (IMAGE_MOCKUPS[mockupKey])
            return IMAGE_MOCKUPS[mockupKey];
        return IMAGE_MOCKUPS['mockup:generic'];
    }

    static async daSpecie(specie: string) {
        return await get(specie);
    }

}
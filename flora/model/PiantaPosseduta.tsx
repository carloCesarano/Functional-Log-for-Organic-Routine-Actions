import {RigaTabella, insert, generaPiantaDaRiga} from "../database/PiantePosseduteDAO";

const LIMITE_INNAFF : number =  3;
const LIMITE_POTAT  : number = 14;
const LIMITE_RINV   : number = 30;

export class PiantaPosseduta {
    id           : number | undefined;
    specie       : string;
    nome         : string;
    dataAcq      : Date;
    freqInnaff   : number | undefined;
    ultimaInnaff : Date;
    freqPotat    : number | undefined;
    ultimaPotat  : Date;
    freqRinv     : number | undefined;
    ultimoRinv   : Date;
    foto         : string | undefined;
    note         : string;
    categorie    : string[];

    /**
     * Costruisce un'istanza di PiantaPosseduta da una riga di
     * database.
     *
     * @param riga Oggetto con i dati della pianta
     */
    constructor(riga: RigaTabella) {
        this.id = riga.id;
        this.specie = riga.specie;
        this.nome = riga.nome;
        this.dataAcq = new Date(riga.dataAcq);
        this.freqInnaff = 1000;
        this.ultimaInnaff = new Date(riga.ultimaInnaff);
        this.freqPotat = 1000;
        this.ultimaPotat = new Date(riga.ultimaPotat);
        this.freqRinv = 1000;
        this.ultimoRinv = new Date(riga.ultimoRinv);
        this.foto = riga.foto;
        this.note = riga.note;
        this.categorie = [];
    }

    /** @returns Id della pianta, -1 se non definito */
    getId()           : number   { return this.id ?? -1           }
    /** @returns Specie della pianta */
    getSpecie()       : string   { return this.specie             }
    /** @returns Nome della pianta */
    getNome()         : string   { return this.nome               }
    /** @returns Data di acquisizione della pianta */
    getDataAcq()      : Date     { return this.dataAcq            }
    /** @returns Ultima data di innaffiatura */
    getUltimaInnaff() : Date     { return this.ultimaInnaff       }
    /** @returns Frequenza in giorni per innaffiatura, default 1000 */
    getFreqInnaff()   : number   { return this.freqInnaff ?? 1000 }
    /** @returns Ultima data di potatura */
    getUltimaPotat()  : Date     { return this.ultimaPotat        }
    /** @returns Frequenza in giorni per potatura, default 1000 */
    getFreqPotat()    : number   { return this.freqPotat  ?? 1000 }
    /** @returns Ultima data di rinvaso */
    getUltimoRinv()   : Date     { return this.ultimoRinv         }
    /** @returns Frequenza in giorni per rinvaso, default 1000 */
    getFreqRinv()     : number   { return this.freqRinv   ?? 1000 }
    /** @returns Percorso della foto collegata, stringa vuota se non definito */
    getFoto()         : string   { return this.foto ?? ""         }
    /** @returns Note aggiuntive */
    getNote()         : string   { return this.note               }
    /** @returns Categoria */
    getCategorie()    : string[] { return this.categorie          }

    /** Crea una nuova pianta e la inserisce nel database.
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

    /**  Restituisce il numero di giorni che mancano
     *  alla prossima innaffiatura. Nel caso il numero
     *  sia <=0, allora la pianta è 'Da innaffiare'.
     */
    giorniAllaProssimaInnaff() : number {
        const oggi = new Date();
        const prossima = new Date(this.ultimaInnaff);
        prossima.setDate(prossima.getDate() + this.getFreqInnaff());
        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24))
    }

    /**  Restituisce il numero di giorni che mancano
     *  alla prossima potatura. Nel caso il numero
     *  sia <=0, allora la pianta è 'Da potare'.
     */
    giorniAllaProssimaPotat() : number {
        const oggi = new Date();
        const prossima = new Date(this.ultimaPotat);
        prossima.setDate(prossima.getDate() + this.getFreqPotat());
        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24))
    }

    /** Restituisce il numero di giorni che mancano
     * al prossimo rinvaso. Nel caso il numero
     * sia <=0, allora la pianta è 'Da rinvasare'.
     *
     * @returns Numero di giorni al prossimo rinvaso
     */
    giorniAlProssimoRinv() : number {
        const oggi = new Date();
        const prossima = new Date(this.ultimoRinv);
        prossima.setDate(prossima.getDate() + this.getFreqRinv());
        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24))
    }

    /** Controlla se la pianta è da innaffiare in
     * base al numero di giorni rimanenti alla
     * prossima innaffiatura.
     *
     * @returns true se è da innaffiare
     */
    daInnaffiare() : boolean {
        return this.giorniAllaProssimaInnaff() <= 0;
    }

    /** Controlla se la pianta è da potare in
     * base al numero di giorni rimanenti alla
     * prossima potatura.
     *
     * @returns true se è da potare
     */
    daPotare() : boolean {
        return this.giorniAllaProssimaPotat() <= 0;
    }

    /** Controlla se la pianta è da rinvasare in
     * base al numero di giorni rimanenti al
     * prossimo rinvaso.
     *
     * @returns true se è da rinvasare
     */
    daRinvasare() : boolean {
        return this.giorniAlProssimoRinv() <= 0;
    }

    /** Controlla se la pianta è in salute in
     * base a se necessita interventi
     *
     * @returns true se è in salute
     */
    inSalute() : boolean {
        return !this.daInnaffiare()
            && !this.daPotare()
            && !this.daRinvasare();
    }

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

        const innaff = normalizza(this.giorniAllaProssimaInnaff(), LIMITE_INNAFF);
        const potat  = normalizza(this.giorniAllaProssimaPotat(),  LIMITE_POTAT );
        const rinv   = normalizza(this.giorniAlProssimoRinv(),     LIMITE_RINV  );

        return innaff * potat * rinv;
    }

}
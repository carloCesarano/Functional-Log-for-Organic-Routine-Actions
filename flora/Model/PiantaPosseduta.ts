import {Riga, insert} from '../Database/PiantePosseduteDAO';
import * as WikiPianteDAO from '../Database/WikiPianteDAO';
import {getPerPianta as categorieGet} from '../Database/PianteCategorieDAO';
import {getPerPianta as interventiGet} from '../Database/InterventiDAO';
import {WikiPianta} from './WikiPianta';
import {assertDefined}  from './UndefinedError';
import {assertNonEmpty} from './EmptyError';
import {colora} from './Coloratore';

const LIMITE_INNAFF : number =  3;
const LIMITE_POTAT  : number = 14;
const LIMITE_RINV   : number = 30;

export class PiantaPosseduta {
    id          ?: number;
    specie      ?: WikiPianta;
    nome        ?: string;
    acq         ?: Date;
    categorie   ?: string[];
    innaff      ?: Date[];
    potat       ?: Date[];
    rinv        ?: Date[];
    foto        ?: string | null;
    note        ?: string;

    // CHIAMATA QUANDO:
    // Quando si effettua un'aggiunta dalla schermata "AggiungiPianta".
    //
    // COSA FA:
    // Crea un nuovo oggetto pianta e aggiorna la tabella PiantePossedute,
    // poi inserisce gli interventi 'Ultima innaffiatura', 'Ultima
    // potatura' e 'Ultimo rinvaso' alla tabella Interventi. Infine
    // aggiunge le categorie collegate alla pianta nella tabella
    // PianteCategorie.
    static async creaNuova(props: Riga, ultimaInnaff: Date, ultimaPotat: Date, ultimoRinv: Date): Promise<PiantaPosseduta> {
        const pianta = new PiantaPosseduta();

        pianta.specie = await WikiPianteDAO.get(props.specie);
        pianta.nome = props.nome;
        pianta.acq = new Date(props.acq);
        pianta.note = props.note ?? '';
        pianta.foto = props.foto;
        pianta.categorie = [];
        pianta.innaff = [ultimaInnaff];
        pianta.potat = [ultimaPotat];
        pianta.rinv = [ultimoRinv];

        await insert(pianta);

        return pianta;
    }

    // CHIAMATA QUANDO:
    // Quando si deve generare un oggetto Pianta dalla tabella
    // PiantePossedute.
    //
    // COSA FA:
    // Prende i dati da PiantePossedute, Specie, PianteCategorie
    // e Interventi per riempire gli attributi dell'oggetto Pianta.
    static async daRiga(riga: Riga): Promise<PiantaPosseduta> {
        const pianta = new PiantaPosseduta();

        pianta.id = riga.id;
        pianta.nome = riga.nome;
        pianta.specie = await WikiPianteDAO.get(riga.specie);
        pianta.acq = new Date(riga.acq);
        pianta.note = riga.note ?? '';
        pianta.foto = riga.foto;
        pianta.categorie = await categorieGet(riga.id);

        const interventi = await interventiGet(riga.id);
        pianta.innaff = interventi.filter(i => i.tipo === 'INN').map(i => i.data).sort((a, b) => a.getTime() - b.getTime());
        pianta.potat = interventi.filter(i => i.tipo === 'POT').map(i => i.data).sort((a, b) => a.getTime() - b.getTime());
        pianta.rinv  = interventi.filter(i => i.tipo === 'RINV').map(i => i.data).sort((a, b) => a.getTime() - b.getTime());

        return pianta;
    }

    // CHIAMATA QUANDO:
    // Si deve reperire l'ID univoco della pianta nella tabella.
    //
    // COSA FA:
    // Restituisce l'ID.
    // Se non è ancora definito, dà UndefinedError.
    getId(): number {
        return assertDefined<number>(this.id, 'id');
    }

    // CHIAMATA QUANDO:
    // Si deve reperire il nome della pianta.
    //
    // COSA FA:
    // Restituisce il nome.
    // Se non è ancora definito, dà UndefinedError.
    getNome(): string {
        return assertDefined<string>(this.nome, 'nome');
    }

    // CHIAMATA QUANDO:
    // Si deve reperire la specie della pianta.
    //
    // COSA FA:
    // Restituisce la specie come oggetto WikiPianta.
    // Se non è ancora definita, dà UndefinedError.
    getSpecie(): WikiPianta {
        return assertDefined<WikiPianta>(this.specie, 'specie');
    }

    // CHIAMATA QUANDO:
    // Si deve reperire la data di acquisizione della pianta.
    //
    // COSA FA:
    // Restituisce la data di acquisizione come oggetto Date.
    // Se non è ancora definita, dà UndefinedError.
    getAcq(): Date {
        return assertDefined<Date>(this.acq, 'acq');
    }

    // CHIAMATA QUANDO:
    // Si deve reperire la lista delle categorie delle quali
    // la pianta fa parte.
    //
    // COSA FA:
    // Restituisce la lista di categorie come array di stringhe.
    // Se non è ancora definita, dà UndefinedError.
    getCategorie(): string[] {
        return assertDefined<string[]>(this.categorie, 'categorie');
    }

    // CHIAMATA QUANDO:
    // Si deve reperire la lista degli interventi di tipo
    // 'Innaffiatura' ricevuti dalla pianta.
    //
    // COSA FA:
    // Restituisce la lista di date in cui è stata effettuata
    // un'innaffiatura ordinate dalla meno recente.
    // Se non è ancora definita, dà UndefinedError.
    // Se è vuota, dà EmptyError.
    getInnaff(): Date[] {
        return assertDefined<Date[]>(this.innaff, 'innaff');
    }

    // CHIAMATA QUANDO:
    // Si deve reperire la lista degli interventi di tipo
    // 'Potatura' ricevuti dalla pianta.
    //
    // COSA FA:
    // Restituisce la lista di date in cui è stata effettuata
    // una potatura ordinate dalla meno recente.
    // Se non è ancora definita, dà UndefinedError.
    // Se è vuota, dà EmptyError.
    getPotat(): Date[] {
        return assertDefined<Date[]>(this.potat, 'potat');
    }

    // CHIAMATA QUANDO:
    // Si deve reperire la lista degli interventi di tipo
    // 'Rinvaso' ricevuti dalla pianta.
    //
    // COSA FA:
    // Restituisce la lista di date in cui è stato effettuato
    // un rinvaso ordinate dalla meno recente.
    // Se non è ancora definita, dà UndefinedError.
    // Se è vuota, dà EmptyError.
    getRinv(): Date[] {
        return assertDefined<Date[]>(this.rinv, 'rinv');
    }

    // CHIAMATA QUANDO:
    // Si devono reperire le note della pianta.
    //
    // COSA FA:
    // Restituisce le note, o se vuote restituisce ''.
    // Se non sono ancora definite, dà UndefinedError.
    getNote(): string {
        return assertDefined<string>(this.note, 'note');
    }

    // CHIAMATA QUANDO:
    // Si deve reperire la foto della pianta.
    //
    // COSA FA:
    // Controlla se è definita una foto nella riga della
    // tabella. Se è definita, la tratta come URI del File
    // System, altrimenti cerca il mockup della sua specie.
    getFoto(): number | {uri: string} {
        if (this.foto)
            return {uri: this.foto}

        return this.getSpecie().getFoto();
    }

    // CHIAMATA QUANDO:
    // Si deve calcolare il countdown alla prossima
    // innaffiatura.
    //
    // COSA FA:
    // Effettua la differenza tra la data dell'ultima
    // innaffiatura e la data odierna e la restituisce
    // come intero. Se ci si trova in ritardo, dà un
    // numero negativo.
    giorniProxInnaff(): number {
        const oggi = new Date();

        const innaffiature: Date[] = assertNonEmpty<Date>(this.getInnaff(), 'innaff');
        const prossima = new Date(innaffiature[innaffiature.length - 1]);
        prossima.setDate(prossima.getDate() + this.getSpecie().getFreqInnaff());

        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24))
    }

    // CHIAMATA QUANDO:
    // Si deve calcolare il countdown alla prossima
    // potatura.
    //
    // COSA FA:
    // Effettua la differenza tra la data dell'ultima
    // potatura e la data odierna e la restituisce
    // come intero. Se ci si trova in ritardo, dà un
    // numero negativo.
    giorniProxPotat(): number {
        const oggi = new Date();

        const potature: Date[] = assertNonEmpty<Date>(this.getPotat(), 'potat');
        const prossima = new Date(potature[potature.length - 1]);
        prossima.setDate(prossima.getDate() + this.getSpecie().getFreqPotat());

        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24));
    }

    // CHIAMATA QUANDO:
    // Si deve calcolare il countdown al prossimo
    // rinvaso.
    //
    // COSA FA:
    // Effettua la differenza tra la data dell'ultimo
    // rinvaso e la data odierna e la restituisce
    // come intero. Se ci si trova in ritardo, dà un
    // numero negativo.
    giorniProxRinv(): number {
        const oggi = new Date();

        const rinvasi: Date[] = assertNonEmpty<Date>(this.getRinv(), 'rinv');
        const prossima = new Date(rinvasi[rinvasi.length - 1]);
        prossima.setDate(prossima.getDate() + this.getSpecie().getFreqRinv());

        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24));
    }

    // CHIAMATA QUANDO:
    // Si deve controllare se la pianta è da innaffiare.
    //
    // COSA FA:
    // Restituisce TRUE se la pianta è da innaffiare oggi
    // o si è in ritardo, altrimenti restituisce FALSE.
    daInnaffiare(): boolean {
        return this.giorniProxInnaff() <= 0;
    }

    // CHIAMATA QUANDO:
    // Si deve controllare se la pianta è da potare.
    //
    // COSA FA:
    // Restituisce TRUE se la pianta è da potare oggi
    // o si è in ritardo, altrimenti restituisce FALSE.
    daPotare(): boolean {
        return this.giorniProxPotat() <= 0;
    }

    // CHIAMATA QUANDO:
    // Si deve controllare se la pianta è da rinvasare.
    //
    // COSA FA:
    // Restituisce TRUE se la pianta è da rinvasare oggi
    // o si è in ritardo, altrimenti restituisce FALSE.
    daRinvasare(): boolean {
        return this.giorniProxRinv() <= 0;
    }

    // CHIAMATA QUANDO:
    // Si deve controllare se la pianta è in saluta.
    //
    // COSA FA:
    // Restituisce FALSE se la pianta è da innaffiare,
    // potare o rinvasare, altrimenti restituisce TRUE.
    inSalute(): boolean {
        return !this.daInnaffiare()
            && !this.daPotare()
            && !this.daRinvasare();
    }

    // CHIAMATA QUANDO:
    // Si deve valutare numericamente lo stato di salute
    // della pianta.
    //
    // COSA FA:
    // Utilizza un algoritmo basato sui giorni di ritardo
    // per i tre tipi di interventi per restituire un valore
    // compreso tra 0 (stato pessimo) e 1 (stato ottimo).
    stato(): number {
        function normalizza(giorni: number, limiteCritico: number): number {
            if (giorni <= -limiteCritico) return 0;
            if (giorni >= 0) return 1;
            return giorni/10 + 1;
        }

        const innaff = normalizza(this.giorniProxInnaff(), LIMITE_INNAFF);
        const potat  = normalizza(this.giorniProxPotat(),  LIMITE_POTAT );
        const rinv   = normalizza(this.giorniProxRinv(),   LIMITE_RINV  );

        const valori : number[] = [innaff, potat, rinv];
        if (valori.some(v => v <= 0.3))
            return (valori.reduce((a,b) => a+b))/10;
        return valori.reduce((a,b) => a*b);
    }

    // CHIAMATA QUANDO:
    // Si deve colorare lo sfondo di una pianta in base
    // al suo stato di salute.
    //
    // COSA FA:
    // Utilizza un algoritmo basato sul risultato della
    // funzione stato() per calcolare un colore che va da
    // VERDE (stato ottimo) a GIALLO (stato mediocre) a
    // ROSSO (stato pessimo).
    coloreStato() : string {
        return colora(this.stato());
    };

    // CHIAMATA QUANDO:
    // Si deve stampare un riassunto degli attributi
    // dell'oggetto Pianta.
    //
    // COSA FA:
    // Restituisce una stringa formattata contenente tutti
    // i dati rilevanti relativi alla pianta.
    toString(): string {
        const foto = this.getFoto();
        const fotoDesc = typeof foto === 'number' ? 'Mockup' : foto.uri;

        const formattaArrayDate = (dates?: Date[]) =>
            dates && dates.length > 0
                ? dates.map(d => d.toLocaleDateString()).join(', ')
                : 'Nessuna';

        const categorie = this.getCategorie()?.join(', ') || 'Nessuna';
        const innaff = formattaArrayDate(this.innaff);
        const potat = formattaArrayDate(this.potat);
        const rinv = formattaArrayDate(this.rinv);

        return `🪴 Pianta #${this.getId()} - ${this.getNome()} (${this.getSpecie().getSpecie()})
    Acquisita il: ${this.getAcq().toLocaleDateString()}
    Categorie: ${categorie}
    Innaffiature: ${innaff}
    Potature: ${potat}
    Rinvasi: ${rinv}
    Foto: ${fotoDesc}
    Stato: ${this.stato().toPrecision(3)}`;
    }

}

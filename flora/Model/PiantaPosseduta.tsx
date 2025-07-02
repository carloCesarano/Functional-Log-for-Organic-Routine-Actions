import {Riga, insert} from '../Database/PiantePosseduteDAO';
import * as WikiPianteDAO from '../Database/WikiPianteDAO';
import {WikiPianta} from './WikiPianta';
import {getPerPianta as categorieGet} from '../Database/PianteCategorieDAO';
import {getPerPianta as interventiGet} from '../Database/InterventiDAO';
import {assertDefined} from './UndefinedError';
import {assertNonEmpty} from './EmptyError';

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
        pianta.innaff = interventi.filter(i => i.tipo === 'INN')
                        .map(i => i.data).sort();
        pianta.potat = interventi.filter(i => i.tipo === 'POT')
                       .map(i => i.data).sort();
        pianta.rinv = interventi.filter(i => i.tipo === 'RINV')
                      .map(i => i.data).sort();

        return pianta;
    }

    getId(): number {
        return assertDefined<number>(this.id, 'id');
    }

    getNome(): string {
        return assertDefined<string>(this.nome, 'nome');
    }

    getSpecie(): WikiPianta {
        return assertDefined<WikiPianta>(this.specie, 'specie');
    }

    getAcq(): Date {
        return assertDefined<Date>(this.acq, 'acq');
    }

    getCategorie(): string[] {
        return assertDefined<string[]>(this.categorie, 'categorie');
    }

    getInnaff(): Date[] {
        return assertDefined<Date[]>(this.innaff, 'innaff');
    }

    getPotat(): Date[] {
        return assertDefined<Date[]>(this.potat, 'potat');
    }

    getRinv(): Date[] {
        return assertDefined<Date[]>(this.rinv, 'rinv');
    }

    getNote(): string {
        return assertDefined<string>(this.note, 'note');
    }

    getFoto(): number | {uri: string} {
        if (this.foto)
            return {uri: this.foto}

        return this.getSpecie().getFoto();
    }

    giorniProxInnaff(): number {
        const oggi = new Date();

        const innaffiature: Date[] = assertNonEmpty<Date>(this.getInnaff(), 'innaff');
        const prossima = new Date(innaffiature[innaffiature.length - 1]);
        prossima.setDate(prossima.getDate() + this.getSpecie().getFreqInnaff());

        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24))
    }

    giorniProxPotat(): number {
        const oggi = new Date();

        const potature: Date[] = assertNonEmpty<Date>(this.getPotat(), 'potat');
        const prossima = new Date(potature[potature.length - 1]);
        prossima.setDate(prossima.getDate() + this.getSpecie().getFreqPotat());

        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24));
    }

    giorniProxRinv(): number {
        const oggi = new Date();

        const rinvasi: Date[] = assertNonEmpty<Date>(this.getRinv(), 'rinv');
        const prossima = new Date(rinvasi[rinvasi.length - 1]);
        prossima.setDate(prossima.getDate() + this.getSpecie().getFreqRinv());

        return Math.ceil((prossima.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24));
    }

    daInnaffiare(): boolean {
        return this.giorniProxInnaff() <= 0;
    }

    daPotare(): boolean {
        return this.giorniProxPotat() <= 0;
    }

    daRinvasare(): boolean {
        return this.giorniProxRinv() <= 0;
    }

    inSalute(): boolean {
        return !this.daInnaffiare()
            && !this.daPotare()
            && !this.daRinvasare();
    }

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

    coloreStato() : string {
        const stato = this.stato();

        let r: number, g: number, b: number;
        if (stato <= 0.5) {
            const t = stato / 0.5;
            r = 230;
            g = Math.round(125 + (210 - 125) * t);
            b = 125;
        } else if (stato < 0.85) {
            const t = (stato - 0.5) / (0.85 - 0.5);
            r = Math.round(230 + (115 - 230) * t);
            g = Math.round(210 + (205 - 210) * t);
            b = Math.round(125 + (110 - 125) * t);
        } else {
            r = 115;
            g = 205;
            b = 110;
        }

        return `rgb(${r},${g},${b})`;
    };

    toString(): string {
        const foto = this.getFoto();
        const fotoDesc = typeof foto === 'number' ? 'Mockup' : foto.uri;

        const formattaArrayDate = (dates?: Date[]) =>
            dates && dates.length > 0
                ? dates.map(d => d.toLocaleDateString()).join(', ')
                : 'Nessuna';

        const categorie = this.categorie?.join(', ') || 'Nessuna';
        const innaff = formattaArrayDate(this.innaff);
        const potat = formattaArrayDate(this.potat);
        const rinv = formattaArrayDate(this.rinv);

        return `🪴 Pianta #${this.getId()} - ${this.getNome()} (${this.getSpecie().getSpecie()})
    Acquisita il: ${this.getAcq().toLocaleDateString()}
    Categorie: ${categorie}
    Innaffiature: ${innaff}
    Potature: ${potat}
    Rinvasi: ${rinv}
    Foto: ${fotoDesc}`;
    }

}
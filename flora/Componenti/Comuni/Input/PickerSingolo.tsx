import {JSX} from 'react';
import PickerMultiplo from './PickerMultiplo';

type Opzione = {
    label: string;
    value: string;
};

interface Props {
    titolo             : string;
    opzioni            : Opzione[];
    selezionato        : string | null;
    onCambia           : (valore: string) => void;
    stileButton       ?: any;
    stileTesto        ?: any;
    stileTestoOpzione ?: any;
    stileContainer    ?: any;
}

export default function (props: Props): JSX.Element {
    const {
        titolo,
        opzioni,
        selezionato,
        onCambia,
        stileButton,
        stileTesto,
        stileTestoOpzione,
        stileContainer
    } = props;
    const selezionati: string[] = selezionato ? [selezionato] : [];

    const seleziona = (lista: string[]) => {
        const nuovo = lista[lista.length - 1] ?? null;
        onCambia(nuovo)
    };

    return (
        <PickerMultiplo
            titolo={titolo}
            opzioni={opzioni}
            selezionati={selezionati}
            onCambia={seleziona}
            stileButton={stileButton}
            stileTesto={stileTesto}
            stileTestoOpzione={stileTestoOpzione}
            stileContainer={stileContainer}/>
    )
}
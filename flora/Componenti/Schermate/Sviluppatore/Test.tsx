import React, {ReactElement, useState} from 'react';
// COMPONENTI CUSTOM
import Button from '../../Comuni/Input/Button';
import {MostraToast} from '../../Comuni/MessaggioToast';
// FOGLI DI STILE
import {styles} from '../../../Styles/Sviluppatore';

interface Props {
    nome      : string,      // Titolo del test
    children  : ReactElement // Schermata effettiva in cui si esegue il test
}

export default function Test({nome, children}: Props) {
    // VARIABILI DI STATO
    const [visibile, setVisibile] = useState<boolean>(false);

    // CHIAMATA QUANDO:
    // Funzione chiamata quando si preme il tasto
    // con il nome del test.
    //
    // COSA FA:
    // Cambia la visibilità della schermata di test.
    const toggleVisibile = () => {
        setVisibile(statoPrecedente => {
            if (statoPrecedente)
                return false;

            const child = children.type as {INTRO ?: string};
            console.log(child.INTRO ?? `TEST: ${nome}`);
            MostraToast({
                tipo: 'success',
                titolo: 'TEST: ' + nome,
                messaggio: 'Per le info del test, vedi i log.'
            });
            return true;
        });

    };

    return (
        <>
            {/* Pulsante per attivare/disattivare il test */}
            <Button
                testo={nome}
                onPress={toggleVisibile}
                stileButton={styles.titoloButton}
                stileTesto={styles.titoloText}>
            </Button>
            {visibile && children}
        </>
    );
}
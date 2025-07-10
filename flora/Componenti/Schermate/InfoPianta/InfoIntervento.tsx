import {Dispatch, JSX, SetStateAction} from 'react';
// COMPONENTI NATIVI
import {Alert, Text, View} from 'react-native';
// COMPONENTI CUSTOM
import Button from '../../Comuni/Input/Button';
// UTILITY
import {MostraToast} from '../../Comuni/MessaggioToast';
import {insert as nuovoIntervento} from '../../../Database/InterventiDAO';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import {PiantaPosseduta} from '../../../Model/PiantaPosseduta';
import {formatta}   from '../../../Model/FormattatoreGiorniRimanenti';
import {colora}     from '../../../Model/Coloratore';
import {normalizza} from '../../../Model/Normalizzatore';

interface Props {
    pianta: PiantaPosseduta | null,
    tipo: string,
    setPianta: Dispatch<SetStateAction<PiantaPosseduta | null>>,
}

const titoli: Record<string, string> = {
    INN:  'Da innaffiare:',
    POT:  'Da potare',
    RINV: 'Da rinvasare'
};

const nomiPulsanti: Record<string, string> = {
    INN:  'INNAFFIA',
    POT:  'POTA',
    RINV: 'RINVASA'
};
const limitiCritici: Record<string, number> = {
    INN:   3,
    POT:  14,
    RINV: 30
}

function giorniProxInt(pianta: PiantaPosseduta | null, tipo: string): number | undefined {
    if (!pianta) return undefined;
    switch (tipo) {
        case 'INN' : return pianta.giorniProxInnaff();
        case 'POT' : return pianta.giorniProxPotat();
        case 'RINV': return pianta.giorniProxRinv();
        default    : return undefined
    }
}

export default function ({pianta, tipo, setPianta}: Props): JSX.Element {
    const confermaIntervento = () => {
        Alert.alert(
            'Conferma',
            'Confermi di aver curato la tua pianta?',
            [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Sì',
                    onPress: () => effettuaIntervento(),
                    style: 'default'
                }
            ]
        )
    }

    const effettuaIntervento = async () => {
        if (pianta === null) return;
        await nuovoIntervento(pianta, tipo, new Date());
        const nuovaPianta = await PiantePosseduteDAO.get(pianta?.getId());
        setPianta(nuovaPianta);
        MostraToast({
            tipo: 'success',
            titolo: 'Intervento effettuato con successo',
            messaggio: 'Continua a prenderti cura delle tue piante!'
        })
    }

    const colorePulsante = () => {
        const limite: number = limitiCritici[tipo];
        return colora(normalizza(giorniProxInt(pianta, tipo), limite))
    }

    return (
        <>
            <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                style={{textAlign: 'center', marginTop: 20, fontSize: 22, fontWeight: 'semibold'}}>
                {titoli[tipo] ?? 'Intervento'}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', height: 64, alignItems: 'center'}}>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={{width: '40%', textAlign: 'center', fontSize: 18}}>
                    {formatta(giorniProxInt(pianta, tipo))}</Text>
                <Button
                    testo={nomiPulsanti[tipo] ?? 'EFFETTUA'}
                    onPress={confermaIntervento}
                    stileButton={{width: '40%', backgroundColor: colorePulsante()}}
                    stileTesto={{textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold'}}/>
            </View>
        </>
    )
}
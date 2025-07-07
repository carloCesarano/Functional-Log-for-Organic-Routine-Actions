import {useCallback, useEffect, useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
// COMPONENTI NATIVI
import {FlatList, View} from 'react-native';
// COMPONENTI CUSTOM
import Titolo from '../../Comuni/Titolo';
import Button from '../../Comuni/Input/Button';
// UTILITY
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import {PiantaPosseduta} from '../../../Model/PiantaPosseduta';
import {colora} from '../../../Model/Coloratore';
import {isPortrait} from '../../Comuni/OrientazioneChecker';
// FOGLI DI STILE
import {PORTRAIT, LANDSCAPE} from '../../../Styles/ProssimiInterventi';

interface Intervento {
    pianta: PiantaPosseduta,
    tipo: 'INN' | 'POT' | 'RINV',
    giorniRimanenti: number
}

// CHIAMATA QUANDO:
// Funzione chiamata quando si deve calcolare il colore
// di sfondo di un intervento.
//
// COSA FA:
// Prende un intervento e restituisce un valore tra 0 e 1
// in base a quanto è urgente (0 per intervento in completo
// ritardo, 1 per intervento non urgente).
function normalizza(intervento: Intervento): number {
    const giorni = intervento.giorniRimanenti;
    const limite = {INN: 3, POT: 14, RINV: 30}[intervento.tipo];

    if (giorni <= -limite) return 0;
    if (giorni >= 0) return 1;
    return giorni/10 + 1;
}

export default function () {
    // VARIABILI DI STATO
    const [interventiAll, setInterventiAll] = useState<Intervento[]>([]);
    const [interventiMostrati, setInterventiMostrati] = useState<Intervento[]>([]);

    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const portraitMode: boolean = isPortrait();

    const stile = portraitMode ? PORTRAIT : LANDSCAPE;

    // CHIAMATA QUANDO:
    // Funzione chiamata quando la schermata diventa attiva.
    //
    // COSA FA:
    // Prende la lista di tutte le piante dal database e costruisce
    // una lista di interventi da eseguire mettendone tre per ogni
    // pianta (innaffiatura, potatura, rinvaso) basandosi sull'ultima
    // volta che sono stati eseguiti.
    useFocusEffect(useCallback(() => {
            const caricaDati = async () => {
                const piante: PiantaPosseduta[] = await PiantePosseduteDAO.getAll();
                const lista: Intervento[] = [];

                for (const pianta of piante)
                    lista.push(
                        {pianta: pianta, tipo: 'INN', giorniRimanenti: pianta.giorniProxInnaff()},
                        {pianta: pianta, tipo: 'POT', giorniRimanenti: pianta.giorniProxPotat()},
                        {pianta: pianta, tipo: 'RINV', giorniRimanenti: pianta.giorniProxRinv()}
                    )

                setInterventiAll(lista);
            };
            caricaDati();
        }, []));

    // CHIAMATA QUANDO:
    // Funzione chiamata alla fine del caricamento dei dati
    // dal database.
    //
    // COSA FA:
    // Prende la lista di tutti gli interventi e sceglie quali
    // mostrare in base a una logica definita e ordinati.
    // La logica è:
    // 1. Solo interventi in ritardo o con giorni rimanenti <= 7;
    // 2. A prescindere, massimo 10 interventi;
    // 3. Interventi ordinati in base all'urgenza (minor valore di
    //    giorni rimanenti).
    useEffect(() => {
        const filtraInterventi = () => {
            setInterventiMostrati(
                interventiAll
                .filter(i => i.giorniRimanenti <= 7)
                .sort((a, b) => a.giorniRimanenti - b.giorniRimanenti)
                .slice(0, 10)
            )
        };
        filtraInterventi();
    }, [interventiAll]);

    // CHIAMATA QUANDO:
    // Funzione chiamata quando si deve mostrare un
    // singolo intervento all'interno della FlatList.
    //
    // COSA FA:
    // Prende un intervento e crea un componente JSX.Element
    // che mostra il tipo di intervento, il nome della pianta
    // e i giorni rimanenti, con un colore di sfondo che va
    // dal verde al rosso in base al ritardo sull'intervento.
    const renderIntervento = ({item}: {item: Intervento}) => {
        const azione: string = {INN: 'Innaffiare', POT: 'Potare', RINV: 'Rinvasare'}[item.tipo];
        const giorni: number = item.giorniRimanenti;
        const giorniStr: string =
            giorni === 0  ? 'oggi' :
            giorni === 1  ? 'tra 1 giorno' :
            giorni === -1 ? '1 giorno in ritardo' :
            giorni < -1   ? `${-giorni} giorni in ritardo` :
                            `tra ${giorni} giorni`;
        const titolo = `${azione} ${item.pianta.getNome()} - ${giorniStr}`;
        const colore = colora(normalizza(item))
        return (
            <Button
                testo={titolo}
                onPress={() => navigation.navigate('InfoPianta', {ID: item.pianta.getId()})}
                stileButton={[stile.renderIntervento, {backgroundColor: colore}]}
            />
        )
    }

    return (
        <View style={stile.containerElemento}>
            <Titolo nome='Prossimi Interventi' stile={stile.titolo}/>
            <FlatList
                keyExtractor={i => `${i.tipo} - ${i.pianta.getId()}`}
                data={interventiMostrati}
                renderItem={renderIntervento}
                contentContainerStyle={stile.containerInterventi}
                scrollEnabled={false}/>
            <Button
                testo='Vedi tutti gli interventi'
                onPress={() => navigation.navigate('Interventi')}
                stileButton={stile.buttonVediTutti}
                stileTesto={stile.testoVediTutti}/>
        </View>
    )
}
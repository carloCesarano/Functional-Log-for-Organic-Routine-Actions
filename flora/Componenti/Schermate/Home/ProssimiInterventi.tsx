import {FlatList, View} from 'react-native';
import {PiantaPosseduta} from "../../../Model/PiantaPosseduta";
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import React, {useEffect, useState} from 'react';
import Titolo from "../../Comuni/Titolo";
import Button from "../../Comuni/Input/Button";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../types";
import {PORTRAIT, LANDSCAPE} from "../../../Styles/ProssimiInterventi";
import {colora} from "../../../Model/Coloratore";
import {isPortrait} from "../../Comuni/OrientazioneChecker";

interface Intervento {
    pianta: PiantaPosseduta,
    tipo: 'INN' | 'POT' | 'RINV',
    giorniRimanenti: number
}

function normalizza(intervento: Intervento): number {
    const giorni = intervento.giorniRimanenti;
    const limite = {INN: 3, POT: 14, RINV: 30}[intervento.tipo];

    if (giorni <= -limite) return 0;
    if (giorni >= 0) return 1;
    return giorni/10 + 1;
}

export default function () {
    const [interventiAll, setInterventiAll] = useState<Intervento[]>([]);
    const [interventiMostrati, setInterventiMostrati] = useState<Intervento[]>([]);

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const stile = isPortrait() ? PORTRAIT : LANDSCAPE;

    useEffect(() => {
        const caricaDati = async () => {
            setInterventiAll([]);
            const piante: PiantaPosseduta[] = await PiantePosseduteDAO.getAll();
            for (const pianta of piante) {
                const INN: Intervento = {
                    pianta: pianta,
                    tipo: 'INN',
                    giorniRimanenti: pianta.giorniProxInnaff()
                };
                const POT: Intervento = {
                    pianta: pianta,
                    tipo: 'POT',
                    giorniRimanenti: pianta.giorniProxPotat()
                };
                const RINV: Intervento = {
                    pianta: pianta,
                    tipo: 'RINV',
                    giorniRimanenti: pianta.giorniProxRinv()
                };
                setInterventiAll(prev => [...prev, INN, POT, RINV]);
            }
        };
        caricaDati();
    }, []);

    useEffect(() => {
        const filtraInterventi = async () => {
            setInterventiMostrati(
                interventiAll
                .filter(i => i.giorniRimanenti <= 7)
                .sort((a, b) => a.giorniRimanenti - b.giorniRimanenti)
                .slice(0, 10)
            )
        };
        filtraInterventi();
    }, [interventiAll]);

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
                keyExtractor={i => `${i.giorniRimanenti} - ${i.tipo} - ${i.pianta.getId()}`}
                data={interventiMostrati}
                renderItem={renderIntervento}
                contentContainerStyle={stile.containerInterventi}
                scrollEnabled={false}/>
        </View>
    )
}
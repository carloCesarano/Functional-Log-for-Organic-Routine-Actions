import {JSX, useEffect, useState, useCallback} from 'react';
// COMPONENTI NATIVI
import {FlatList, View, Text, TouchableOpacity, ScrollView} from 'react-native';
// COMPONENTI CUSTOM
import Titolo from '../../Comuni/Titolo';
import Button from '../../Comuni/Input/Button';
// UTILITY
import { PiantaPosseduta } from '../../../Model/PiantaPosseduta';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import * as InterventiDAO from '../../../Database/InterventiDAO';
import { colora } from '../../../Model/Coloratore';
import { MostraToast } from '../../Comuni/MessaggioToast';
// FOGLI DI STILE
import { styles } from '../../../Styles/EsseguiIntervento';

interface Intervento {
    pianta: PiantaPosseduta,
    tipo: 'INN' | 'POT' | 'RINV',
    giorniRimanenti: number
}

export default function (): JSX.Element {
    const [interventi, setInterventi] = useState<Intervento[]>([]);
    const [selezionati, setSelezionati] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(false);

    const caricaInterventi = useCallback(async () => {
        setLoading(true);
        const piante = await PiantePosseduteDAO.getAll();
        let lista: Intervento[] = [];
        for (const pianta of piante) {
            lista.push({
                pianta,
                tipo: 'INN',
                giorniRimanenti: pianta.giorniProxInnaff()
            });
            lista.push({
                pianta,
                tipo: 'POT',
                giorniRimanenti: pianta.giorniProxPotat()
            });
            lista.push({
                pianta,
                tipo: 'RINV',
                giorniRimanenti: pianta.giorniProxRinv()
            });
        }
        lista.sort((a, b) => a.giorniRimanenti - b.giorniRimanenti);
        setInterventi(lista);
        setLoading(false);
    }, []);

    useEffect(() => {
        caricaInterventi();
    }, [caricaInterventi]);

    const toggleSelezione = (key: string) => {
        setSelezionati(prev => {
            const nuovo = new Set(prev);
            if (nuovo.has(key)) nuovo.delete(key);
            else nuovo.add(key);
            return nuovo;
        });
    };
    const conferma = async () => {
        if (selezionati.size === 0) {
            MostraToast({
                tipo: 'error',
                titolo: 'Errore',
                messaggio: 'Seleziona almeno un intervento'
            });
            return;
        }
        setLoading(true);
        for (const key of selezionati) {
            const [id, tipo] = key.split('-');
            const intervento = interventi.find(i => i.pianta.getId().toString() === id && i.tipo === tipo as 'INN' | 'POT' | 'RINV');
            if (intervento) {
                await InterventiDAO.insert(intervento.pianta, intervento.tipo, new Date());
            }
        }
        setSelezionati(new Set());
        await caricaInterventi();
        setLoading(false);
        MostraToast({
            tipo: 'success',
            titolo: 'Successo',
            messaggio: selezionati.size === 1
                ? 'Intervento aggiunto correttamente'
                : 'Interventi aggiunti correttamente'
        });
    };

    function normalizza(intervento: Intervento): number {
        const giorni = intervento.giorniRimanenti;
        const limite = {INN: 3, POT: 14, RINV: 30}[intervento.tipo];
        if (giorni <= -limite) return 0;
        if (giorni >= 0) return 1;
        return giorni / 10 + 1;
    }
    const renderItem = ({ item }: { item: Intervento }) => {
        const key = `${item.pianta.getId()}-${item.tipo}`;
        const azione = { INN: 'Innaffiare', POT: 'Potare', RINV: 'Rinvasare' }[item.tipo];
        const giorni = item.giorniRimanenti;
        const giorniStr =
            giorni === 0 ? 'oggi' :
                giorni === 1 ? 'tra 1 giorno' :
                    giorni === -1 ? '1 giorno in ritardo' :
                        giorni < -1 ? `${-giorni} giorni in ritardo` :
                            `tra ${giorni} giorni`;
        const colore = colora(normalizza(item));
        return (
            <TouchableOpacity
                onPress={() => toggleSelezione(key)}
                style={[
                    styles.item,
                    { backgroundColor: colore },
                    selezionati.has(key) ? styles.selezionato : styles.nonSelezionato
                ]}
            >
                <View style={[
                    styles.cerchio,
                    selezionati.has(key) ? styles.cerchioSelezionato : styles.cerchioNonSelezionato
                ]} />
                <Text style={styles.testo}>
                    {azione} {item.pianta.getNome()} - {giorniStr}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <ScrollView style={styles.container}>
                <Titolo nome='Tutti gli interventi'/>
                {loading ? <Text style={styles.caricamento}>Caricamento...</Text> :
                    <FlatList
                        data={interventi}
                        style={{flexGrow: 0}}
                        contentContainerStyle={{paddingBottom: 18}}
                        scrollEnabled={false}
                        keyExtractor={item => `${item.pianta.getId()}-${item.tipo}`}
                        renderItem={renderItem}
                    />
                }
            </ScrollView>
            <Button
                testo="Conferma"
                onPress={conferma}
                stileButton={[styles.bottone, { opacity: selezionati.size === 0 ? 0.5 : 1 }]}
                stileTesto={styles.testoButton}
            />
        </>
    );
}
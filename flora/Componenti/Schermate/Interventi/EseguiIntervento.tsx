import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { PiantaPosseduta } from '../../../Model/PiantaPosseduta';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import * as InterventiDAO from '../../../Database/InterventiDAO';
import Button from '../../Comuni/Input/Button';
import { colora } from '../../../Model/Coloratore';
import { styles } from '../../../Styles/EsseguiIntervento';
import { MostraToast } from '../../Comuni/MessaggioToast';

type TipoIntervento = 'INN' | 'POT' | 'RINV';

interface Intervento {
    pianta: PiantaPosseduta,
    tipo: TipoIntervento,
    giorniRimanenti: number
}

export default function EseguiIntervento() {
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
            const intervento = interventi.find(i => i.pianta.getId().toString() === id && i.tipo === tipo as TipoIntervento);
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
        <View style={styles.container}>
            <Text style={styles.titolo}>Tutti gli Interventi</Text>
            {loading ? <Text style={styles.caricamento}>Caricamento...</Text> :
                <FlatList
                    data={interventi}
                    keyExtractor={item => `${item.pianta.getId()}-${item.tipo}`}
                    renderItem={renderItem}
                />
            }
            <Button
                testo="Conferma"
                onPress={conferma}
                stileButton={[styles.bottone, { opacity: selezionati.size === 0 ? 0.5 : 1 }]}
                stileTesto={styles.testoButton}
            />
        </View>
    );
}
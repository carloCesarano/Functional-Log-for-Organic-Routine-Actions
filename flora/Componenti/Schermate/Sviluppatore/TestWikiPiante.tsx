import React, {useEffect, useState} from 'react';
import {Image, View, Text, FlatList} from 'react-native';
import {WikiPianta} from '../../../Model/WikiPianta';
import * as WikiPianteDAO from '../../../Database/WikiPianteDAO';
import Button from '../../Comuni/Input/Button';

export function TestWikiPiante() {
    const [piante, setPiante] = useState<WikiPianta[]>([]);
    const [num, setNum] = useState<number>(0);
    const [caricamento, setCaricamento] = useState<boolean>(true);

    useEffect(() => {
        const caricaPiante = async () => {
            try {
                const data: WikiPianta[] = await WikiPianteDAO.getAll();
                setPiante(data.sort((a,b) => b.getId() - a.getId()));
            } catch (error) {
                console.error('[TestWikiPiante]: caricaPiante error:', error);
            } finally {
                setCaricamento(false);
            }
        };
        caricaPiante();
    }, []);

    const aggiungiPianta = async () => {
        setNum(num => num + 1);
        const dati: Omit<WikiPianteDAO.Riga, 'id'> = {
            specie: 'Nuova' + num.toString(),
            freqInnaff: 1,
            freqPotat: 2,
            freqRinv: 3,
            foto: null
        };
        const p = await WikiPianta.creaNuova(dati);
        if (p)
            setPiante(curr => [p, ...curr]);
        else
            console.warn('Errore creazione nuova pianta:', num);
    }

    const renderPianta= ({item}: {item: WikiPianta}) => (
        <View style={{flexDirection: 'row'}}>
            <Image
                source={item.getFoto() as any}
                style={{width: 100, height: 100}}
                resizeMode='center'/>
            <Text>{item.toString()}</Text>
        </View>
    )

    return (
        <View
            style={{flex: 1}}>
            <Text>Caricamento: {Number(caricamento).toString()}</Text>
            <Button testo='Aggiungi' onPress={aggiungiPianta}/>
            <FlatList
                style={{paddingBottom: 200}}
                data={piante}
                renderItem={renderPianta}
                keyExtractor={(p) => p.getId().toString()}/>
        </View>
    )
}
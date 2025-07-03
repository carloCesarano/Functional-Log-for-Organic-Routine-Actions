import React, {useEffect, useState} from 'react';
import {Image, View, Text, FlatList} from 'react-native';
import {WikiPianta} from '../../../Model/WikiPianta';
import * as WikiPianteDAO from '../../../Database/WikiPianteDAO';
import Button from '../../Comuni/Input/Button';
import {styles} from '../../../Styles/Sviluppatore';

TestWikiPiante.INTRO = `TEST: WikiPiante
Questo test mira a controllare l'efficacia delle funzioni esportate
dal modulo 'WikiPianteDAO'. La ScrollView è riempita con delle specie
reperite dalla funzione getAll() e ordinate per id dal maggiore. 
I tre pulsanti servono per:
1. Aggiungere una nuova specie al Database;
2. Eliminare l'ultima specie nel Database (id maggiore);
3. Modificare il nome dell'ultima specie nel Database (id maggiore).
Il label 'Caricamento' è TRUE quando un'azione è stata avviata ma non
ha ancora dato segnale di completamento.
FUNZIONI UTILIZZATE:
- WikiPianteDAO.getAll
- WikiPianteDAO.remove
- WikiPianteDAO.update
- WikiPianta.creaNuova
- PiantaPosseduta.getId
`;

export function TestWikiPiante() {
    const [piante, setPiante] = useState<WikiPianta[]>([]);
    const [num, setNum] = useState<number>(0);
    const [caricamento, setCaricamento] = useState<boolean>(true);

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

    useEffect(() => {
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
            caricaPiante();
        else
            console.warn('Errore creazione nuova pianta:', num);
    }

    const eliminaUltima = async () => {
        setNum(num => num + 1);
        const p = piante[0];
        await WikiPianteDAO.remove(p);
        await caricaPiante();
    }

    const aggiornaUltima = async () => {
        setNum(num => num + 1);
        const p = piante[0];
        p.specie = 'Aggiornata ' + num.toString();
        await WikiPianteDAO.update(p);
        await caricaPiante();
    }

    const renderPianta= ({item}: {item: WikiPianta}) => (
        <View style={{flexDirection: 'row'}}>
            <Image
                source={item.getFoto() as any}
                style={{width: 100, height: 100}}
                resizeMode='cover'/>
            <Text>{item.toString()}</Text>
        </View>
    )

    return (
        <View style={styles.test}>
            <Text>Caricamento: {caricamento ? 'TRUE' : 'FALSE'}</Text>
            <Button testo='Aggiungi' onPress={aggiungiPianta} stileButton={styles.button}/>
            <Button testo='Elimina ultima' onPress={eliminaUltima} stileButton={styles.button}/>
            <Button testo='Aggiorna ultima' onPress={aggiornaUltima} stileButton={styles.button}/>
            <FlatList
                style={{paddingBottom: 200}}
                data={piante}
                renderItem={renderPianta}
                keyExtractor={(p) => p.getId().toString()}/>
        </View>
    )
}
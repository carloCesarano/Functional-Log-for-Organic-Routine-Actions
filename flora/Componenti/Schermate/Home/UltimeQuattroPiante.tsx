import {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
import {useNavigation} from "@react-navigation/native";
// COMPONENTI NATIVI
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
// COMPONENTI CUSTOM
import Titolo from '../../Comuni/Titolo';
// UTILITY
import {isPortrait} from '../../Comuni/OrientazioneChecker';
import {PiantaPosseduta} from '../../../Model/PiantaPosseduta';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
// FOGLI DI STILE
import {styles} from '../../../Styles/UltimePianteAggiunte';

export default function UltimeQuattroPiante() {
    // VARIABILI DI STATO
    const [ultimeQuattro, setUltimeQuattro] = useState<PiantaPosseduta[]>([]);

    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const portraitMode: boolean = isPortrait();

    // Definisce il numero di colonne della tabella che
    // mostra le ultime quattro piante, in base
    // all'orientazione del dispositivo.
    const colonne: number = portraitMode ? 2 : 4;

    // QUANDO VIENE CHIAMATA:
    // Funzione chiamata quando si carica la schermata.
    //
    // COSA FA:
    // Preleva dal database le ultime quattro piante
    // aggiunte (quelle con l'ID maggiore) e le
    // inserisce all'interno della variabile di
    // stato 'ultimeQuattro'.
    useEffect(() => {
        const caricaPiante = async () => {
            const piante: PiantaPosseduta[] = await PiantePosseduteDAO.getAll();
            const ordinate = piante.sort((a, b) => b.getId() - a.getId());
            setUltimeQuattro(ordinate.slice(0, 4));
        };
        caricaPiante();
    }, []);

    const goToInfoPianta = (id: number) => {
        navigation.navigate('InfoPianta', {ID: id});
    }

    // QUANDO VIENE CHIAMATA:
    // Funzione chiamata quando si deve mostrare
    // una delle quattro piante.
    //
    // COSA FA:
    // Costruisce un oggetto cliccabile che mostra
    // l'immagine della pianta e il suo nome, con
    // colore di sfondo dettato dalla funzione
    // 'pianta.coloreStato()'.
    const renderPianta = ({item}: {item: PiantaPosseduta}) => {
        return (
            <TouchableOpacity
                style={[styles.renderPianta, {backgroundColor: item.coloreStato()}]}
                onPress={() => goToInfoPianta(item.getId())}>

                <Image
                    source={item.getFoto()}
                    style={styles.immaginePianta}
                    />

                <Text
                    style={styles.nomePianta}
                    ellipsizeMode='tail'
                    numberOfLines={1}>
                    {item.getNome()}
                </Text>

            </TouchableOpacity>
        )
    }

    return (
        <View>
            <Titolo nome='Ultime piante aggiunte' stile={styles.titolo}/>
            <FlatList
                key={portraitMode ? 'PORTRAIT' : 'LANDSCAPE'}
                data={ultimeQuattro}
                renderItem={renderPianta}
                keyExtractor={item => item.getId().toString()}
                scrollEnabled={false}
                numColumns={colonne}
                contentContainerStyle={styles.containerPiante}
            />
        </View>
    )
}

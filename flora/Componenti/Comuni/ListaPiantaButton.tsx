import React from 'react';
import {RootStackParamList} from '../../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
// COMPONENTI NATIVI
import {TouchableOpacity, Text} from 'react-native';
// UTILITY
import {isPortrait} from './OrientazioneChecker';
// FOGLI DI STILE
import {styles} from '../../Styles/ListaPiantaButton';

export default function ListaPianteButton() {
    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const portraitMode = isPortrait();

    // QUANDO VIENE CHIAMATA:
    // Quando si clicca sul pulsante 'Vedi tutte le piante'
    // tra la sezione 'UltimePianteAggiunte' e 'ProssimiInterventi'
    // nelle schermate principali.
    //
    // COSA FA:
    // Passa alla schermata 'ListaPiante'
    const vaiAllaSchermataListaPiante = () => {
        navigation.navigate('ListaPiante',{cercato:''});
    }

    const stile = portraitMode ? 'buttonP' : 'buttonL';

    return (
        <TouchableOpacity
            style={styles[stile]}
            onPress={vaiAllaSchermataListaPiante}>
            <Text style={styles.testo}>Vedi tutte le piante                            →</Text>
        </TouchableOpacity>
    )
}
import React from 'react';
import {RootStackParamList} from '../../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
// COMPONENTI NATIVI
import {TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
// UTILITY
import {isPortrait} from './OrientazioneChecker';
// FOGLI DI STILE
import {styles} from '../../Styles/AggiungiPiantaButton';

export default function AggiungiPiantaButton() {
    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const portraitMode = isPortrait();

    // QUANDO VIENE CHAMATA:
    // Quando si clicca sul pulsante '+' in basso a destra
    // nelle schermate principali.
    //
    // COSA FA:
    // Passa alla schermata 'AggiungiPianta'
    const vaiAllaSchermataAggiungiPianta = () => {
        navigation.navigate('AggiungiPianta');
    }

    const stile = portraitMode ? 'buttonP' : 'buttonL';

    return (
        <TouchableOpacity
            style={styles[stile]}
            onPress={vaiAllaSchermataAggiungiPianta}>

            <Ionicons
                name='add'
                size={32}
                color='white'/>
        </TouchableOpacity>
    )
}
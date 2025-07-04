import React from 'react';
import {RootStackParamList} from '../../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
// COMPONENTI NATIVI
import {TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
// FOGLI DI STILE
import {styles} from '../../Styles/AggiungiPiantaButton';

export default function AggiungiPiantaButton() {
    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

    // QUANDO VIENE CHAMATA:
    // Quando si clicca sul pulsante '+' in basso a destra
    // nelle schermate principali.
    //
    // COSA FA:
    // Passa alla schermata 'AggiungiPianta'
    const vaiAllaSchermataAggiungiPianta = () => {
        navigation.navigate('AggiungiPianta');
    }

    return (
        <TouchableOpacity
            style={styles.aggiungiPiantaButton}
            onPress={vaiAllaSchermataAggiungiPianta}>

            <Ionicons
                name='add'
                size={32}
                color='white'/>
        </TouchableOpacity>
    )
}
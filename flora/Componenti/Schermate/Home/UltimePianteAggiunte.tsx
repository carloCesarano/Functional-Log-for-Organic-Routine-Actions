import React from 'react';
import {RootStackParamList} from '../../../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
// COMPONENTI NATIVI
import {View} from 'react-native';
// COMPONENTI CUSTOM
import UltimeQuattroPiante from './UltimeQuattroPiante';
import Button from '../../Comuni/Input/Button';
// FOGLI DI STILE
import {styles} from '../../../Styles/UltimePianteAggiunte';

export default function UltimePianteAggiunte() {
    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const goToListaPiante = () => {
        navigation.navigate('ListaPiante', {cercato: ''});
    }

    return (
        <View style={styles.containerElemento}>
            <UltimeQuattroPiante/>
            <Button
                testo='Vedi tutte le piante'
                onPress={goToListaPiante}
                stileButton={styles.buttonVediTutte}
                stileTesto={styles.testoVediTutte}
                />
        </View>
    )
}
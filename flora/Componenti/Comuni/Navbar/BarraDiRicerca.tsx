import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
// COMPONENTI NATIVI
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

export default function BarraDiRicerca() {
    // VARIABILI DI STATO
    const [testo, setTesto] = useState<string>("");
    const testoNonVuoto = testo.length > 0;

    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute();

    // CHIAMATA QUANDO:
    // Funzione chiamata quando si preme il tasto
    // "Invio" durante la ricerca.
    //
    // COSA FA:
    // Porta alla schermata ListaPiante (se non ci
    // si trova già) e imposta il parametro "cercato"
    // sul testo inserito.
    const invioRicerca = () => {
        if (route.name === 'ListaPiante')
            navigation.setParams({cercato: testo})
        else
            navigation.navigate('ListaPiante', {cercato: testo});
    };

    // CHIAMATA QUANDO:
    // Funzione chiamata quando si clicca il pulsante
    // "X" all'interno della barra di ricerca.
    //
    // COSA FA:
    // Pulisce il testo.
    const pulisciTesto = () => {
        setTesto("");
        if (route.name === 'ListaPiante')
            navigation.setParams({cercato: ""})
    };

    return (
        <View>
            <TextInput
                value={testo}
                onChangeText={setTesto}
                onSubmitEditing={invioRicerca}
                placeholder="Cerca"/>

            {testoNonVuoto && (
                <TouchableOpacity
                    onPress={pulisciTesto}>

                    <Text>X</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
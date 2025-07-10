import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
// COMPONENTI NATIVI
import {View, Text, TextInput, TouchableOpacity, ViewStyle} from 'react-native';

export default function ({stile}: {stile: ViewStyle}) {
    // VARIABILI DI STATO
    const [testo, setTesto] = useState<string>("");
    const [focus, setFocus] = useState<boolean>(false);
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

    const style: ViewStyle = focus ? stile : {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    };

    // CHIAMATA QUANDO:
    // Funzione chiamata quando si clicca sulla
    // scritta 'Cerca'.
    //
    // COSA FA:
    // Applica uno stile personalizzato alla
    // barra di ricerca.
    const impostaStile = () => setFocus(true);

    // CHIAMATA QUANDO:
    // Funzione chiamata quando si termina
    // di usare la barra di ricerca (si
    // clicca su qualcos'altro o si preme
    // 'Invio').
    //
    // COSA FA:
    // Resetta lo stile della barra di ricerca.
    const eliminaStile = () => {
        setFocus(false);
    }

    return (
        <View style={style}>
            <TextInput
                style={{maxWidth: '80%', fontSize: 18}}
                onFocus={impostaStile}
                onBlur={eliminaStile}
                value={testo}
                onChangeText={setTesto}
                onSubmitEditing={invioRicerca}
                placeholder="Cerca"/>

            {testoNonVuoto && (
                <TouchableOpacity
                    onPress={pulisciTesto}>

                    <Text style={{
                        backgroundColor: 'white',
                        borderRadius: 100,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        fontWeight: '800'
                    }}>X</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
// COMPONENTI NATIVI
import {TouchableOpacity, View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const OPZIONI = [
    "Impostazioni",
    "Analisi",
    "Categorie",
    "Sviluppatore"
] as const;
type OPZIONE = typeof OPZIONI[number];

export default function HamburgerMenu() {
    // VARIABILI DI STATO
    const [isAperto, setAperto] = useState<boolean>(false);
    
    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // CHIAMATA QUANDO:
    // Funzione chiamata quando si clicca sull'icona
    // del menu.
    //
    // COSA FA:
    // Mostra o nasconde il menu.
    const toggleMenu = () => {
        setAperto(!isAperto);
    }

    // CHIAMATA QUANDO:
    // Funzione chiamata quando si clicca su una
    // delle possibili opzioni del menu.
    //
    // COSA FA:
    // Naviga alla schermata corrispondente.
    const onOpzione = (opzione: OPZIONE) => {
        navigation.navigate(opzione);
    }

    return (
        <View>
            <TouchableOpacity
                onPress={toggleMenu}>

                <Ionicons
                    name="menu"
                    size={32}/>

            </TouchableOpacity>

            {isAperto && (
                <View>
                    {OPZIONI.map(opzione => (
                        <TouchableOpacity
                            key={opzione}
                            onPress={() => {
                                onOpzione(opzione);
                                setAperto(false);
                            }}>

                            <Text>{opzione}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    )
}
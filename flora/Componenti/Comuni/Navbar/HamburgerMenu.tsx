import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
// COMPONENTI NATIVI
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
// COMPONENTI CUSTOM
import Button from '../Input/Button';

const OPZIONI = [
    "Analisi",
    "Categorie",
    "Impostazioni",
    "Sviluppatore"
] as const;
type OPZIONE = typeof OPZIONI[number];

export default function HamburgerMenu({iconStyle, menuStyle, optionStyle}: {iconStyle: ViewStyle, menuStyle: ViewStyle, optionStyle: ViewStyle}) {
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
        <View style={iconStyle}>
            <TouchableOpacity
                onPress={toggleMenu}>

                <Ionicons
                    name="menu"
                    size={42}/>

            </TouchableOpacity>

            {isAperto && (
                <View style={menuStyle}>
                    {OPZIONI.map(opzione => (
                        <Button
                            key={opzione}
                            testo={opzione}
                            stileButton={optionStyle}
                            onPress={() => {
                                onOpzione(opzione);
                                setAperto(false);
                            }}/>
                    ))}
                </View>
            )}
        </View>
    )
}
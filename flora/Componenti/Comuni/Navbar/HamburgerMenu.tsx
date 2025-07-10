import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
// COMPONENTI NATIVI
import {TouchableOpacity, View, ViewStyle, Platform, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
// COMPONENTI CUSTOM
import Button from '../Input/Button';

const OPZIONI = [
    "Analisi",
    "Categorie",
    "Specie",
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
        <View style={[iconStyle, {zIndex: 1000}]}>
            <TouchableOpacity
                onPress={toggleMenu}>

                <Ionicons
                    name="menu"
                    size={42}/>

            </TouchableOpacity>

            {isAperto && (
                <>
                    {/* Overlay per iOS che copre il resto dell'applicazione */}
                    <TouchableOpacity
                        style={[
                            styles.overlay,
                            Platform.OS === 'ios' && styles.iosOverlay
                        ]}
                        onPress={toggleMenu}
                        activeOpacity={1}
                    />
                    
                    {/* Menu vero e proprio */}
                    <View style={[
                        menuStyle,
                        Platform.OS === 'ios' && styles.iosMenu
                    ]}>
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
                </>
            )}
        </View>
    )
}

// Stili specifici per il componente HamburgerMenu
const styles = StyleSheet.create({
    // Overlay che copre tutta la schermata
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
    // Stile specifico per l'overlay su iOS
    iosOverlay: {
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    // Stile specifico per il menu su iOS
    iosMenu: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Per Android comunque
    }
});
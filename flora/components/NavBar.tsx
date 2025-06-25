import React from "react";
import {Image, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import SearchBox from "./SearchBox";
import {navbarStyles} from "../styles/navbar";
import HamburgerMenu from "./HamburgerMenu";
import {globalStyles, isMobile} from "../styles/global";


export default function NavBar() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // Metodo chiamato quando si effettua una ricerca nella SearchBox
    const handleSearch = (text: string) => {
        navigation.navigate('ListaPiante', {searched: text});
    };

    // Gestione selezione voci menu
    const handleMenuItemSelect = (item: string) => {
        switch(item) {
            case 'Analisi':
                navigation.navigate('Analisi');
                break;
            case 'Categoria':
                navigation.navigate('Categoria');
                break;
            case 'Impostazioni':
                console.log('Impostazioni cliccato');
                break;
            default:
                console.log('Voce menu non gestita:', item);
        }
    };

    return (
        <View style={navbarStyles.navbar}>
            <Image style={navbarStyles.icon} source={require('../assets/full_logo.png')} />
            {isMobile ? (
                <>
                    <SearchBox onSubmit={handleSearch} />
                    <HamburgerMenu
                        menuItems={['Impostazioni', 'Analisi', 'Categoria']}
                        onItemSelect={handleMenuItemSelect}
                    />
                </>
            ) : (
                <View style={globalStyles.hbox}>
                    <SearchBox onSubmit={handleSearch} />
                    <HamburgerMenu
                        menuItems={['Impostazioni','Analisi', 'Categoria']}
                        onItemSelect={handleMenuItemSelect}
                    />
                </View>
            )}
        </View>
    );
}
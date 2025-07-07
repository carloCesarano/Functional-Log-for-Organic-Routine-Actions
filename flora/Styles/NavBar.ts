import {StyleSheet, Platform} from 'react-native';

export const PORTRAIT = StyleSheet.create({
    // <NavBar> -> <View>
    navbar: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: 1, // Aggiunto per garantire l'ordine degli elementi
    },
    // <Icona> -> <Image>
    icona: {
        width: 80,
        height: 80,
    },
    // <HamburgerMenu> -> <View>
    hamburgerIcon: {
        marginRight: 10,
        zIndex: 1000, // Aumentato per garantire che sia sopra gli altri elementi
    },
    // <HamburgerMenu> -> <View> -> <View>
    hamburgerMenu: {
        position: 'absolute',
        right: 5,
        top: 40,
        minWidth: 150,
        zIndex: 1001, // Aumentato per garantire che sia sopra l'overlay
        elevation: Platform.OS === 'android' ? 1000 : 0, // Solo per Android
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#eaf5df',
    },
    hamburgerOption: {
        borderRadius: 10,
        backgroundColor: '#eaf5df',
        borderBottomWidth: 0.5
    },
    barraRicerca: {
        width: '50%',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#e6f8d1',
        borderStyle: "solid",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    }
});

export const LANDSCAPE = StyleSheet.create({
    // <NavBar> -> <View>
    navbar: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: 1, // Aggiunto per garantire l'ordine degli elementi
    },
    // <Icona> -> <Image>
    icona: {
        width:  80,
        height: 80,
    },
    // <HamburgerMenu> -> <View>
    hamburgerIcon: {
        marginRight: 10,
        zIndex: 1000, // Aumentato per garantire che sia sopra gli altri elementi
    },
    // <HamburgerMenu> -> <View> -> <View>
    hamburgerMenu: {
        position: 'absolute',
        right: 5,
        top: 40,
        minWidth: 150,
        zIndex: 1001, // Aumentato per garantire che sia sopra l'overlay
        elevation: Platform.OS === 'android' ? 1000 : 0, // Solo per Android
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#eaf5df',
    },
    hamburgerOption: {
        borderRadius: 10,
        backgroundColor: '#eaf5df',
        borderBottomWidth: 0.5
    },
    barraRicerca: {
        width: '50%',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#e6f8d1',
        borderStyle: "solid",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    }
});
import {StyleSheet} from 'react-native';

export const PORTRAIT = StyleSheet.create({
    // <NavBar> -> <View>
    navbar: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    // <Icona> -> <Image>
    icona: {
        width: 80,
        height: 80,
    },
    // <HamburgerMenu> -> <View>
    hamburgerIcon: {
        marginRight: 10,
    },
    // <HamburgerMenu> -> <View> -> <View>
    hamburgerMenu: {
        position: 'absolute',
        right: 5,
        top: 40,
        minWidth: 150,
        zIndex: 1000,
        elevation: 1000,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#eaf5df',
    },
    hamburgerOption: {
        borderRadius: 10,
        backgroundColor: '#eaf5df',
    }
});

export const LANDSCAPE = StyleSheet.create({
    // <NavBar> -> <View>
    navbar: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    // <Icona> -> <Image>
    icona: {
        width:  80,
        height: 80,
    },
    // <HamburgerMenu> -> <View>
    hamburgerIcon: {
        marginRight: 10,
    },
    // <HamburgerMenu> -> <View> -> <View>
    hamburgerMenu: {
        position: 'absolute',
        right: 5,
        top: 40,
        minWidth: 150,
        zIndex: 1000,
        elevation: 1000,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#eaf5df',
    },
    hamburgerOption: {
        borderRadius: 10,
        backgroundColor: '#eaf5df',
    }
})
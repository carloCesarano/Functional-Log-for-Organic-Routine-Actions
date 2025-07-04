import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000000,
        elevation: 1000000
    },
    // <Toast> -> config
    toast: {
        display: 'flex',
        position: 'absolute',
        top: 80,
        zIndex: 1000,
        elevation: 1000,
    },

    // <Toast> -> config -> contentContainerStyle
    contenuto: {
        paddingHorizontal: 15,
    },

    // <Toast> -> config -> text1Style
    titolo: {
        fontSize: 18,
        fontWeight: '400',
    },

    // <Toast> -> config -> text2Style
    messaggio: {
        fontSize: 14,
    },
})
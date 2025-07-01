import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    // <Toast> -> config
    toast: {
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
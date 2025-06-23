import {StyleSheet, Dimensions} from "react-native";

const isPhone = Dimensions.get('window').width < 768;

export const globalStyles = StyleSheet.create({
    // Container principale dell'applicazione
    background: {
        backgroundColor: '#d0e7b6',
        padding: 16,
        flex: 1,
        paddingVertical: isPhone ? 32 : 16,
        paddingHorizontal: 16,
    },
    // Semplice contenitore orizzontale
    hbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    // L'icona presente nella main bar
    icon: {
        width: 150,
        height: 150,
    },

    hamburgmenu:{
        width:50,
        height: 50,
    },
    searchBox: {
        flexDirection: 'row',       // 1) metti gli elementi in orizzontale
        alignItems: 'center',       // 2) allinea verticalmente icona e input
        height: 60,
        width: 240,
        backgroundColor: '#52b04e',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#0e4523',
        borderStyle: 'solid',
        paddingHorizontal: 10,      // 3) un po’ di padding orizzontale
    },

    searchBoxText: {
        flex: 1,                    // 4) occupa tutto lo spazio rimanente
        fontSize: 32,
        paddingHorizontal: 10,      // 5) distanzia il testo dai bordi
        color: '#fff',              // 6) imposta un colore visibile
    },

    mainButton: {
        backgroundColor: '#52b04e',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    mainButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});
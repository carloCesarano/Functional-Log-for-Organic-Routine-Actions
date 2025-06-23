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
    searchBox: {
        height: 90,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#52b04e",
        borderRadius: 50,
        borderStyle: "solid",
        borderColor: "#0e4523",
        borderWidth: 3,
    },
    searchBoxText: {
        flex: 1,
        fontSize: 32,
        paddingHorizontal: 30,
        borderRadius: 50,
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
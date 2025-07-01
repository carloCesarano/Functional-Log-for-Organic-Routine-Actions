import {StyleSheet, Platform} from "react-native";

export const isMobile: boolean = Platform.OS === "android" || Platform.OS === "ios";

export const globalStyles = StyleSheet.create({
    // Container principale dell'applicazione
    background: {
        flex: 1,
        paddingVertical: isMobile ? 50 : 16,
        paddingHorizontal: 16,
    },
    LAND_background: {
        flex: 1,
        paddingVertical: isMobile ? 50 : 16,
        paddingHorizontal: 50,
    },
    // Semplice contenitore orizzontale
    hbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    mainButton: {
        backgroundColor: '#52b04e',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: 'flex-start',
        marginVertical: 8,
    },
    mainButtonText: {
        color: 'black',
        fontSize: 25,
        fontWeight: '600',
    },

    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#52b04e',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },

    titolo: {

        textAlign: "center",
        fontSize: 25,


    },

});
import { StyleSheet } from "react-native";

export const piantaButtonStyles = StyleSheet.create({
    button: {
        width: '40%',
        marginVertical: 8,
        padding: 10,
        backgroundColor: '#52b04e',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 4,
        marginBottom: 8,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    }
});
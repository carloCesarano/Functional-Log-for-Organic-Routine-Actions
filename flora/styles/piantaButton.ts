import { StyleSheet } from "react-native";

export const piantaButtonStyles = StyleSheet.create({
    button: {
        width: '40%',
        marginVertical: 8,
        borderRadius: 8,
        elevation: 5,
        backgroundColor: "transparent"
    },
    gradient: {
        flex: 1,
        padding: 10,
        borderRadius: 8
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 6,
        marginBottom: 8,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    }
});
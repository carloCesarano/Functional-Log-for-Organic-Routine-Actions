import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    input: {
        height: 50,
        borderRadius: 8,
        padding: 8,
        marginVertical: 10,
        backgroundColor: "white",
        fontSize: 16,
    },

    bottoneAnnulla: {
        backgroundColor: "#e74c3c",
        height: 48,
        width: 280,
        alignSelf: "center",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
    },

    bottoneAggiungi: {
        backgroundColor: "#30a505",
        height: 48,
        width: 280,
        alignSelf: "center",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
    },

    testoBottone: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    formContainer: {
        width: "100%",
        alignSelf: "center",
    },
    bottoniContainer: {
        marginTop: 15,
    },

    // GESTIONE MODALITA' LANDSCAPE

    bottoniContainerLandscape: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
        marginTop: 10,
        marginBottom: 20,
    },

    formContainerLandscape: {
        width: 600,
        alignSelf: "center",
    },

});
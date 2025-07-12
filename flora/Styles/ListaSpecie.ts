import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff"
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: "white",
        width: 350,
        alignSelf: "center",
        borderWidth: 2,
        borderColor: "black",
    },

    cardSelezionata: {
        backgroundColor: "#66bb6a"
    },

    foto: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12
    },

    info: {
        flex: 1
    },

    nome: {
        fontSize: 18,
        fontWeight: "bold"
    },

    freq: {
        fontSize: 14,
        color: "#555",
        padding: 2,
    },

    bottoneElimina: {
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


    // GESTIONE MODALITA' LANDSCAPE
    listaContent: {
        paddingBottom: 50
    },

    listaContentLandscape: {
        paddingBottom: 30,
        paddingHorizontal: 60
    },

    cardLandscape: {
        width: 600
    },
    bottoniContainer: {
        marginTop: 15,
    },
    bottoniContainerLandscape: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 20,
    },


});
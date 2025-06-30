import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    scroll: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        maxWidth: "80%",
        marginHorizontal: "10%",
        paddingHorizontal: "10%",
        paddingVertical: "5%",
        borderRadius: 10,
    },
    titolo: {
        fontSize: 24,
        width: "100%",
        textAlign: "center",
        backgroundColor: "white",
        padding: 5,
        borderRadius: 5,
    },
    specie: {
        fontSize: 20,
        marginBottom: 20,
        fontStyle: "italic",
        width: "80%",
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: 5,
    },
    image: {
        width: 180,
        height: 180,
        resizeMode: "center",
        borderRadius: 8,
        marginBottom: 20,
    },
    infoBox: {
        backgroundColor: "white",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    eliminaButton: {
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 15,
        width: "40%",
        backgroundColor: "#e86f6f"
    },
    modificaButton: {
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 15,
        width: "40%",
    },
});
import {StyleSheet} from "react-native";

export const aggiungiPiantaStyles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#2E4A2C",
        textAlign: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#D4EDB6",
        borderRadius: 16,
        padding: 16,
        justifyContent: "space-between",
    },
    scrollArea: {
        width: "100%",
        flex: 1,
    },
    form: {
        alignItems: "center",
        gap: 12,
        paddingVertical: 8,
    },
    photoBox: {
        width: 120,
        height: 120,
        backgroundColor: "#fff",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        marginBottom: 16,
    },
    photo: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    photoText: {
        color: "#888",
        fontWeight: "500",
    },
    input: {
        width: "100%",
        height: 44,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: "black",
        borderWidth: 0,
    },
    picker: {
        height: 44,
        alignSelf: "stretch",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: "#2E4A2C",
        borderWidth: 0,
    },
    pickerText: {
        fontSize: 16,
        fontWeight: "normal",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        marginTop: 10
    },
    cancelButton: {
        backgroundColor: "#C69C91",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        flex: 1,
        marginRight: 8,

    },
    addButton: {
        backgroundColor: "#7DBB8D",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        flex: 1,
        marginLeft: 8,
    },
    cancelText: {
        color: "#2E4A2C",
        textAlign: "center",
        fontWeight: "bold",

    },
    addText: {
        color: "#2E4A2C",
        textAlign: "center",
        fontWeight: "bold",
    },


    pickerContainer: {
        width: '100%',
        marginBottom: 20,
    },
    pickerLabel: {
        color: '#555',
        marginBottom: 5,
        fontSize: 16,
    },

    modalContent: {
        backgroundColor: '#fff',
        width: '90%',
        padding: 20,
        borderRadius: 20,
        minHeight: 250,
        alignSelf: 'center',
        marginVertical: 20,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',

    },

    modalButton: {
        backgroundColor: '#C69C91',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,

    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }



});
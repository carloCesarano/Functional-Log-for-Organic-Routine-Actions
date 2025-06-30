import {StyleSheet} from "react-native";

export const aggiungiPiantaStyles = StyleSheet.create({
    titolo: {
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
    fotoContainer: {
        width: 120,
        height: 120,
        backgroundColor: "#fff",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        marginBottom: 16,
    },
    foto: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    fotoText: {
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
    categoriePicker: {
        position: 'absolute',
        bottom: 70,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.80,
        elevation: 5,
        zIndex: 1,
        minWidth: 200,
        maxHeight: 300,
        paddingBottom: 20,
    },
    datePicker: {
        height: 44,
        alignSelf: "stretch",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: "#2E4A2C",
        borderWidth: 0,
    },
    datePickerText: {
        fontSize: 16,
        fontWeight: "normal",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        marginTop: 10
    },
    annullaButton: {
        backgroundColor: "#C69C91",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        flex: 1,
        marginRight: 8,
    },
    aggiungiButton: {
        backgroundColor: "#7DBB8D",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        flex: 1,
        marginLeft: 8,
    },
    buttonText: {
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
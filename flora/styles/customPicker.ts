import {StyleSheet} from "react-native";

export const customPickerStyles = StyleSheet.create({
    input: {
        width: "100%",
        height: 44,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: "black",
        borderWidth: 0,
        marginTop: 10,
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
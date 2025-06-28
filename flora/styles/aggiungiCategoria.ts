import {StyleSheet, Platform} from "react-native";

export const isMobile: boolean = Platform.OS === "android" || Platform.OS === "ios";

export const aggiungiCategoriaStyles = StyleSheet.create({

    container: {
        marginVertical: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    primaryButton: {
        flex: 1,
        marginLeft: 5,
        backgroundColor: '#4CAF50',
    },
    secondaryButton: {
        flex: 1,
        marginRight: 5,
        backgroundColor: '#f44336',
    },

})
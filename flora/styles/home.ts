import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    button: {
        marginHorizontal: "7.5%",
        width: "85%",
        backgroundColor: 'transparent',
        borderRadius: 20,
        alignItems: "flex-start",
        marginVertical: 8,
    },
    gradient: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    text: {
        color: 'black',
        fontSize: 23,
        fontWeight: '500',
        fontStyle: "italic"
    },

    piantaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: 10,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 5,
        height: '30%'

    },
    buttonModal: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 20,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',


    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },

});
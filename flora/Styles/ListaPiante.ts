import {StyleSheet} from "react-native";

export const listaPianteStyles = StyleSheet.create({

    specie: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    data: {
        fontSize: 14,
        color: '#666',
    },

    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    categoria: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    acquisizione: {
        fontSize: 14,
        color: '#666',
    },
    card: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        elevation: 5,
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginLeft: 15,
    },
    cardContent: {
        flex: 1,
    },
    gradient: {
        flexDirection: 'row',
        flex: 1,
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    flatList: {
        marginBottom: 10
    },
});

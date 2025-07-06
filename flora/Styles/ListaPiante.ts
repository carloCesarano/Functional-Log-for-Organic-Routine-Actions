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
    filterMenu: {
        position: 'absolute',
        bottom: 116,
        right: 140,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.80,
        elevation: 5,
        zIndex: 1,
        minWidth: 160,
        maxHeight: 300,
        paddingBottom: 20,
    },
    filterOption: {
        padding: 10,
    },
    filterOptionText: {
        fontSize: 16,
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
        color: '#888',
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
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    flatList: {
        marginTop: 10,
        marginBottom: 50,
    },
});

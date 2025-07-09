import { StyleSheet } from 'react-native';

export const PORTRAIT = StyleSheet.create({
    containerCarosello: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: 'green',
        borderRadius: 10,
        height: 100,
    },
    titolo: {
        padding: 5,
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    containerCategorie: {
        paddingHorizontal: 10,
        gap: 10,
        margin: 10,
    },
    cardCategoria: {
        backgroundColor: '#d0e8f2',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nomeCategoria: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
    },
    boxNumPiante: {
        marginTop: 15,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: '#e6f2ff',
        borderRadius: 10,
        alignItems: 'center',
    },
    titoloNumPiante: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#333',
        textAlign: 'center',
    },
    numeroPiante: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0066cc',
        textAlign: 'center',
    },

    // 👇 AGGIUNTI PER MOSTRARE LE PIANTE DELLA CATEGORIA
    listaPianteCategoria: {
        marginTop: 10,
        width: '100%',
        gap: 12,
    },
    cardPianta: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    nomePianta: {
        fontSize: 16,
        color: '#333',
    },
    noPiantaTrovata: {
        fontStyle: 'italic',
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 10,
    },
});

export const LANDSCAPE = StyleSheet.create({
    ...PORTRAIT,
    containerCarosello: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        backgroundColor: 'green',
        borderRadius: 10,
        height: 100,
    },
});

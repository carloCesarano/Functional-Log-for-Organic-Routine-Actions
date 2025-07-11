import { StyleSheet } from 'react-native';

export const PORTRAIT = StyleSheet.create({
    containerCarosello: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: '#bbe89f',
        borderRadius: 24,
        borderWidth: 2,
        borderStyle: 'solid',
        paddingVertical: 8,
    },
    titolo: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 0,
    },
    containerCategorie: {
        paddingHorizontal: 10,
        gap: 10,
        margin: 10,
        paddingRight: 30,
    },
    cardCategoria: {
        backgroundColor: '#67d362',
        borderRadius: 8,
        padding: 8
    },
    cardCategoriaSelezionata: {
        backgroundColor: '#e5e89b',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        padding: 8
    },
    nomeCategoria: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
    },
    boxNumPiante: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: '#bbe89f',
        borderRadius: 24,
        borderWidth: 2,
        borderStyle: 'solid',
        paddingVertical: 8,
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
    flatList: {
        marginBottom: 10
    },

});

export const LANDSCAPE = StyleSheet.create({
    ...PORTRAIT,
});

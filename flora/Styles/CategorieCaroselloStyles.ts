// Styles/CategorieCaroselloStyles.ts
import { StyleSheet } from 'react-native';

export const PORTRAIT = StyleSheet.create({
    containerCarosello: {
        marginVertical: 10,
    },
    containerCategorie: {
        paddingHorizontal: 10,
        gap: 10,
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
});

export const LANDSCAPE = StyleSheet.create({
    ...PORTRAIT,
    containerCarosello: {
        marginVertical: 5,
    },
});

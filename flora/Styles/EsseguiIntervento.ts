import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    titolo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    caricamento: {},
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
        padding: 10,
        borderRadius: 8,
    },
    selezionato: {
        opacity: 0.6,
    },
    nonSelezionato: {
        opacity: 1,
    },
    cerchio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#333',
        marginRight: 12,
    },
    cerchioSelezionato: {
        backgroundColor: '#333',
    },
    cerchioNonSelezionato: {
        backgroundColor: '#fff',
    },
    testo: {
        fontSize: 16,

        flexShrink: 1,
        flexWrap: 'wrap',
    },
    bottone: {
        marginTop: 18,
        marginBottom: 18,
        width: 250,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#52B04E',
        borderRadius: 30,
        fontSize: 40,
    },

    testoButton: {
        fontSize: 25,
        color: 'white',

    }

});
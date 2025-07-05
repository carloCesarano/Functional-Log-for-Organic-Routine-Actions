import {StyleSheet} from 'react-native';

export const PORTRAIT = StyleSheet.create({
    containerElemento: {
        marginTop: 18,
        borderWidth: 2,
        borderRadius: 24,
        paddingVertical: 8,
        backgroundColor: '#bbe89f',
        borderColor: '#384637',
        alignItems: 'center',
        paddingBottom: 8,
    },
    titolo: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 8,
    },
    containerInterventi: {
        justifyContent: 'center',
        alignItems: "center",
    },
    renderIntervento: {
        minWidth: '90%',
        maxWidth: '90%',
        borderRadius: 8,
        marginBottom: 8
    },
});

export const LANDSCAPE = StyleSheet.create({
    containerElemento: {
        marginTop: 18,
        borderWidth: 2,
        borderRadius: 24,
        paddingVertical: 8,
        backgroundColor: '#bbe89f',
        borderColor: '#384637',
        alignItems: 'center',
        paddingBottom: 8,
    },
    titolo: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 8,
    },
    containerInterventi: {
        justifyContent: 'center',
    },
    renderIntervento: {
        minWidth: '90%',
        borderRadius: 8,
        marginBottom: 8
    },
});

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    containerElemento: {
        borderWidth: 2,
        borderRadius: 24,
        paddingVertical: 8,
        backgroundColor: '#bbe89f',
        borderColor: '#384637'
    },
    titolo: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 0,
    },
    containerPiante: {
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    renderPianta: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: 120,
        margin: 8,
        borderRadius: 8,
    },
    immaginePianta: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    nomePianta: {
        color: 'black',
        marginTop: 8,
        fontSize: 16,
        width: '80%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonVediTutte: {
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        height: 30,
    },
    testoVediTutte: {
        fontStyle: 'italic',
        paddingHorizontal: 5,
    },
});
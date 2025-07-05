import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    // PORTRAIT: <ListaPianteButton> -> <TouchableOpacity>
    buttonP: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#52B04E',
        borderRadius: 8,
        alignItems: 'center',
    },
    // LANDSCAPE: <ListaPianteButton> -> <TouchableOpacity>
    buttonL: {
        marginVertical: 15,
        padding: 8,
        backgroundColor: '#52B04E',
        borderRadius: 8,
        alignItems: 'center',
    },
    // Testo del pulsante
    testo: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    pulsanteApertura: {
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: 'black',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    picker: {
        width: "80%",
        height: 60,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 18,
    },
    pickerItem: {
        borderRadius: 8,
        color: 'black'
    },
    chiudiButton: {
        backgroundColor: '#C69C91',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '60%',
    },
    chiudiText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
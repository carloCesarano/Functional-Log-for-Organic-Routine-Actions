import { StyleSheet } from 'react-native';

export const PORTRAIT = StyleSheet.create({
    bottone: {
        backgroundColor: '#30a505',
        padding: 12,
        borderRadius: 8,
        marginVertical: 25,
        alignItems: 'center',
        width: '45%'
    },
    testoBottone: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    containerInput: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        gap: 10,
    },
    input: {
        borderColor: '#4caf50',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 50,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        gap: 10,
    },
});

export const LANDSCAPE = StyleSheet.create({
    ...PORTRAIT,
    containerInput: {
        marginVertical: 5,
    },
});
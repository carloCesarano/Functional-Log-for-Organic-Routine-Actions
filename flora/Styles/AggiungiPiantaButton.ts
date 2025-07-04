import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    // PORTRAIT: <AggiungiPiantaButton> -> <TouchableOpacity>
    buttonP: {
        position: 'absolute',
        bottom: 60,
        right: 30,
        width: 60,
        height: 60,
        elevation: 5,
        zIndex: 5,
        backgroundColor: '#52B04E',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // LANDSCAPE: <AggiungiPiantaButton> -> <TouchableOpacity>
    buttonL: {
        position: 'absolute',
        bottom: 30,
        right: 60,
        width: 60,
        height: 60,
        elevation: 5,
        zIndex: 5,
        backgroundColor: '#52B04E',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
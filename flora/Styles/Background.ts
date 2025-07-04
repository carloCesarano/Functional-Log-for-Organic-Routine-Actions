import {StyleSheet} from 'react-native';

export const PORTRAIT = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 36
    }
});

export const LANDSCAPE = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 32,
        paddingRight: 48,
        paddingLeft: 36
    }
});
import React, {ReactNode} from 'react';
// COMPONENTI NATIVI
import {ViewStyle} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
// UTILITY
import {isPortrait} from './OrientazioneChecker';
// FOGLI DI STILE
import {PORTRAIT, LANDSCAPE} from '../../Styles/Background';

interface Props {
    children ?: ReactNode;
}

export default function Background({children}: Props) {
    // HOOKS
    const portraitMode: boolean = isPortrait();
    const stile: {background: ViewStyle} = portraitMode ? PORTRAIT : LANDSCAPE;

    return (
        <LinearGradient
            style={stile.background}
            colors={['#eef8e8', '#c7deac']}>

            {children}

        </LinearGradient>
    )
}
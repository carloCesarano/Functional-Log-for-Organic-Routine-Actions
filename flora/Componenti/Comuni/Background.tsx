import React, {ReactNode} from 'react';
// COMPONENTY NATIVI
import {LinearGradient} from 'expo-linear-gradient';
// UTILITY
import {isPortrait} from "./OrientazioneChecker";
// FOGLI DI STILE
import {PORTRAIT, LANDSCAPE} from '../../Styles/Background';

interface Props {
    children ?: ReactNode;
}

export default function Background({children}: Props) {
    // HOOKS
    const portraitMode = isPortrait();
    const style = portraitMode ? PORTRAIT : LANDSCAPE;

    return (
        <LinearGradient
            style={style.background}
            colors={['#eef8e8', '#c7deac']}>

            {children}

        </LinearGradient>
    )
}
import {LinearGradient} from 'expo-linear-gradient';
import {ReactNode} from "react";
import {isPortrait} from "./OrientazioneChecker";
import {globalStyles, isMobile} from "../../styles/global";

interface Props {
    children: ReactNode;
}

export default function Background({children}: Props) {
    return (
        <LinearGradient
            colors={isMobile ? ['#eef8e8', '#c7deac'] : ['#dae8d3', '#c7deac']}
            style={isPortrait() ? globalStyles.background : globalStyles.LAND_background}
        >
            {children}
        </LinearGradient>
    );
}
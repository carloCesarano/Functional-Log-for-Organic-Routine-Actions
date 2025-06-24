import {LinearGradient} from 'expo-linear-gradient';
import {ReactNode} from "react";
import {globalStyles, isMobile} from "../styles/global";

interface Props {
    children: ReactNode;
}

export default function Background({children}: Props) {
    return (
        isMobile ?
        <LinearGradient
            colors={['#eef8e8', '#c7deac']}
            style={globalStyles.background}
        >
            {children}
        </LinearGradient>
        :
        <LinearGradient
            colors={['#dae8d3', '#c7deac']}
            style={globalStyles.background}
        >
            {children}
        </LinearGradient>
    )
}
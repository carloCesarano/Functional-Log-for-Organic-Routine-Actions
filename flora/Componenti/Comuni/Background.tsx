import {ReactNode} from 'react';
import {LinearGradient} from 'expo-linear-gradient';

interface Props {
    children ?: ReactNode;
}

export default function Background({children}: Props) {
    return (
        <LinearGradient
            colors={['#eef8e8', '#c7deac']}>

            {children}

        </LinearGradient>
    )
}
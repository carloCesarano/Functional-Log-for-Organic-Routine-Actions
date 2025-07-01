import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import Background from '../Componenti/Comuni/Background';

type Props = NativeStackScreenProps<RootStackParamList, 'Impostazioni'>;

export default function Impostazioni({navigation}: Props) {
    return (
        <Background/>
    )
}
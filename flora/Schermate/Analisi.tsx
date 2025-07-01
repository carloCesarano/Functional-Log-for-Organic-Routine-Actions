import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';

type Props = NativeStackScreenProps<RootStackParamList, 'Analisi'>;

export default function Analisi({navigation}: Props) {
    return (
        <Background/>
    )
}
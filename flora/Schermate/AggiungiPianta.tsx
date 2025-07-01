import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';

type Props = NativeStackScreenProps<RootStackParamList, 'AggiungiPianta'>;

export default function AggiungiPianta({navigation}: Props) {
    return (
        <Background/>
    )
}
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import Background from '../Componenti/Comuni/Background';

type Props = NativeStackScreenProps<RootStackParamList, 'InfoPianta'>;

export default function InfoPianta({navigation, route}: Props) {
    const {idPianta} = route.params;

    return (
        <Background/>
    )
}
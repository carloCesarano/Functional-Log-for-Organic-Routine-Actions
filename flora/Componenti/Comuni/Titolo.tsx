import React from 'react';
import {Text} from 'react-native';

interface Props {
    nome: string
}

export default function Titolo({nome}: Props) {
    return (
        <Text style={{
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 16
        }}>{nome}</Text>
    )
}
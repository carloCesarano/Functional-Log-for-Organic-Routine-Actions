import React from 'react';
// COMPONENTI NATIVI
import {Text, TextStyle} from 'react-native';

interface Props {
    nome: string,
    stile?: TextStyle
}

export default function Titolo({nome, stile}: Props) {
    return (
        <Text
            style={[{
                fontSize: 32,
                fontWeight: 'bold',
                marginBottom: 16,
                textAlign: 'center'
            }, stile]}>

            {nome}
        </Text>
    )
}

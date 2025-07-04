import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';

// DEFINISCO GLI INPUT
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'ListaPiante'>;
interface Props extends Partial<NavigationProps> {
    cercato: string
}

export default function ListaPiante({cercato}: Props) {
    const [stati,     setStati    ] = useState<string[]>([]);
    const [categorie, setCategorie] = useState<string[]>([]);

    return (
        <Background>
            <NavBar/>
            <Titolo nome="ListaPiante"/>

            {/*
            <VistaPiante cercato={cercato} filtri={{stati, categorie}}/>

            <MenuFiltri .../> // Da specificare gli input

            // Ho tolto il pulsante "Indietro" da quasi tutte le schermate
            // perché, dato che l'app deve girare solo su mobile, non serve
            // più.
            */}
        </Background>
    )
}
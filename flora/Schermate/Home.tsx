import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
// COMPONENTI NATIVI
import {ScrollView} from 'react-native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar from '../Componenti/Comuni/NavBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({navigation}: Props) {
    return (
        <Background>
            <NavBar/>

            <ScrollView>
                {/*
                <UltimePianteAggiunte/>
                <ProssimiInterventi/>
                */}
            </ScrollView>

            {/*
            <AggiungiPiantaButton/>
            */}
        </Background>
    )
}
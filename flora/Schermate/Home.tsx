import React from 'react';
// COMPONENTI NATIVI
import {ScrollView} from 'react-native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';
import AggiungiPiantaButton from '../Componenti/Comuni/AggiungiPiantaButton';

export default function Home() {
    return (
        <Background>
            <NavBar/>
            <Titolo nome='Home'/>

            <ScrollView>
                {/*
                <UltimePianteAggiunte/>
                <ProssimiInterventi/>
                */}
            </ScrollView>

            <AggiungiPiantaButton/>
        </Background>
    )
}
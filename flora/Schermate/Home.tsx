import React from 'react';
// COMPONENTI NATIVI
import {ScrollView} from 'react-native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar from '../Componenti/Comuni/NavBar';

export default function Home() {
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
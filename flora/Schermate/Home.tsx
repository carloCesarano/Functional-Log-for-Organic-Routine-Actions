import React from 'react';
// COMPONENTI NATIVI
import {ScrollView} from 'react-native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';
import AggiungiPiantaButton from '../Componenti/Comuni/AggiungiPiantaButton';
import ListaPiantaButton from '../Componenti/Comuni/ListaPiantaButton';
import ProssimiInterventi from '../Componenti/Schermate/Home/ProssimiInterventi';

export default function Home() {
    return (
        <Background>
            <NavBar/>
            <Titolo nome='Home'/>

            <ScrollView>
                {/*<UltimePianteAggiunte/>*/}
                <ListaPiantaButton/>

                <ProssimiInterventi/>
            </ScrollView>


            <AggiungiPiantaButton/>
        </Background>
    )
}
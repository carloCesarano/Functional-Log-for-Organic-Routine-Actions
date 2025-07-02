import React from 'react';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';

export default function Analisi() {
    return (
        <Background>
            <NavBar/>
            <Titolo nome='Analisi'/>

        </Background>
    )
}
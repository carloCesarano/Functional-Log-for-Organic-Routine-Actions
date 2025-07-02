import React from 'react';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';
import Test from '../Componenti/Schermate/Sviluppatore/Test';
// SINGOLI TEST
import {TestWikiPiante} from '../Componenti/Schermate/Sviluppatore/TestWikiPiante';

export default function Sviluppatore() {
    return (
        <Background>
            <NavBar/>
            <Titolo nome="Sviluppatore"/>

            <Test nome='TestWikiPiante'>
                <TestWikiPiante/>
            </Test>

        </Background>
    )
}
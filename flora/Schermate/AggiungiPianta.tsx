import {JSX} from 'react';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';
import Form from '../Componenti/Schermate/AggiungiPianta/Form';

export default function (): JSX.Element {
    return (
        <Background>
            <NavBar/>
            <Titolo nome='AggiungiPianta'/>
            <Form/>
        </Background>
    )
}
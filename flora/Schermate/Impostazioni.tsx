import {JSX} from 'react';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';

export default function (): JSX.Element {
    return (
        <Background>
            <NavBar/>
            <Titolo nome="Impostazioni"/>

        </Background>
    )
}
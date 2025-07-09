import {JSX} from 'react';
// COMPONENTI CUSTOM
import NavBar      from '../Componenti/Comuni/NavBar';
import Background  from '../Componenti/Comuni/Background';
import ListaSpecie from '../Componenti/Schermate/Specie/ListaSpecie';
import Titolo from '../Componenti/Comuni/Titolo';

export default function (): JSX.Element {
    return (
        <Background>
            <NavBar/>
            <Titolo nome='Specie'/>
            <ListaSpecie/>
        </Background>
    );
}
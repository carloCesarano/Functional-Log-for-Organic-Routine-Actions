import {JSX} from 'react';
// COMPONENTI CUSTOM
import NavBar      from '../Componenti/Comuni/NavBar';
import Background  from '../Componenti/Comuni/Background';
import ListaSpecie from '../Componenti/Schermate/Specie/ListaSpecie';

export default function (): JSX.Element {
    return (
        <Background>
            <NavBar/>
            <ListaSpecie/>
        </Background>
    );
}
import {JSX} from 'react';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import EseguiIntervento from '../Componenti/Schermate/Interventi/EseguiIntervento';


export default function (): JSX.Element {
    return (
        <Background>
            <NavBar/>
            <EseguiIntervento/>
        </Background>
    )
}


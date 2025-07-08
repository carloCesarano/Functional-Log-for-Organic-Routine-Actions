import {JSX, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import EseguiIntervento from '../Componenti/Schermate/Interventi/EseguiIntervento';
// UTILITY
import {stampaTabella} from '../Database/DAO';


export default function (): JSX.Element {
    // LOG PER SVILUPPATORI
    useFocusEffect(useCallback(() => {stampaTabella('Interventi')}, []));

    return (
        <Background>
            <NavBar/>
            <EseguiIntervento/>
        </Background>
    )
}


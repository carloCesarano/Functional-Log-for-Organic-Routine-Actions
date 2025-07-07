import {JSX} from 'react';
// COMPONENTI NATIVI
import {ScrollView} from 'react-native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';
import UltimePianteAggiunte from '../Componenti/Schermate/Home/UltimePianteAggiunte';
import ProssimiInterventi   from '../Componenti/Schermate/Home/ProssimiInterventi';
import AggiungiPiantaButton from '../Componenti/Comuni/AggiungiPiantaButton';

export default function (): JSX.Element {

    return (
        <Background>
            <NavBar/>
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                <Titolo nome='Home'/>
                <UltimePianteAggiunte/>
                <ProssimiInterventi/>
            </ScrollView>
            <AggiungiPiantaButton/>
        </Background>
    )
}

import {JSX} from 'react';
// COMPONENTI NATIVI
import {ScrollView} from 'react-native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar from '../Componenti/Comuni/NavBar';
import Titolo from '../Componenti/Comuni/Titolo';
import NumPiantePresenti       from '../Componenti/Schermate/Analisi/NumPiantePresenti';
import NumPianteCategoria      from '../Componenti/Schermate/Analisi/NumPianteSpecie';
import GraficoInterventiPiante from '../Componenti/Schermate/Analisi/GraficoInterventiPiante';
import StatoGeneraleCollezione from '../Componenti/Schermate/Analisi/StatoGeneraleCollezione';
// FOGLI DI STILE
import AnalisiStyles from '../Styles/Analisi';

export default function (): JSX.Element {
    return (
        <Background>
            <NavBar/>
            <ScrollView
                style={AnalisiStyles.PORTRAIT.scrollContainer}
                contentContainerStyle={AnalisiStyles.PORTRAIT.contentContainer}
            >
                <Titolo nome='Analisi'/>
                <StatoGeneraleCollezione/>
                <GraficoInterventiPiante/>
                <NumPiantePresenti/>
                <NumPianteCategoria/>
            </ScrollView>
        </Background>
    );
}
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import Background from '../Componenti/Comuni/Background';
import NavBar from '../Componenti/Comuni/NavBar';
import Titolo from '../Componenti/Comuni/Titolo';
import NumPiantePresenti from '../Componenti/Schermate/Analisi/NumPiantePresenti';
import NumPianteCategoria from '../Componenti/Schermate/Analisi/NumPianteSpecie';
import GraficoInterventiPiante from '../Componenti/Schermate/Analisi/GraficoInterventiPiante';
import StatoGeneraleCollezione from '../Componenti/Schermate/Analisi/StatoGeneraleCollezione';
import AnalisiStyles from '../Styles/Analisi';

export default function Analisi() {
    const [aggiorna, setAggiorna] = useState(false);

    return (
        <Background>
            <NavBar/>
            <ScrollView
                style={AnalisiStyles.PORTRAIT.scrollContainer}
                contentContainerStyle={AnalisiStyles.PORTRAIT.contentContainer}
            >
                <Titolo nome='Analisi'/>
                <StatoGeneraleCollezione key={`stato-${aggiorna}`}/>
                <GraficoInterventiPiante key={`interventi-${aggiorna}`}/>
                <NumPiantePresenti key={`presenti-${aggiorna}`}/>
                <NumPianteCategoria key={`categorie-${aggiorna}`}/>
            </ScrollView>
        </Background>
    );
}
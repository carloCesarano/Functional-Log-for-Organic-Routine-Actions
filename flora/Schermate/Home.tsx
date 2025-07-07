import {JSX} from 'react';
// COMPONENTI NATIVI
import {Button, ScrollView} from 'react-native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';
import UltimePianteAggiunte from '../Componenti/Schermate/Home/UltimePianteAggiunte';
import ProssimiInterventi   from '../Componenti/Schermate/Home/ProssimiInterventi';
import AggiungiPiantaButton from '../Componenti/Comuni/AggiungiPiantaButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';// Assicurati che il tipo sia corretto
import Button2 from '../Componenti/Comuni/Input/Button';
import {useNavigation} from "@react-navigation/native";


export default function (): JSX.Element {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <Background>
            <NavBar/>
            <ScrollView contentContainerStyle={{paddingBottom: 10}}>
                <Titolo nome='Home'/>
                <UltimePianteAggiunte/>
                <Button2
                    testo="Vai a Interventi //// Pulsante prova"
                    onPress={() => navigation.navigate('Interventi')}
                />
                <ProssimiInterventi/>

            </ScrollView>
            <AggiungiPiantaButton/>
        </Background>
    )
}

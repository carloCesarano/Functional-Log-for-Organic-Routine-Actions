import React, { useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
// COMPONENTI NATIVE
import {Text} from 'react-native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar from '../Componenti/Comuni/NavBar';
import Titolo from '../Componenti/Comuni/Titolo';
import Button from '../Componenti/Comuni/Input/Button';
import {TestWikiPiante} from '../Componenti/Schermate/Sviluppatore/TestWikiPiante';
// FOGLI DI STILE
import {styles} from '../Styles/Sviluppatore';

type Props = NativeStackScreenProps<RootStackParamList, 'Sviluppatore'>;

export default function Sviluppatore({navigation}: Props) {
    // VARIABILI DI STATO
    const [testWikiPiante, setTestWikiPiante] = useState<boolean>(false);

    const toggleTestWikiPiante = () => {
        setTestWikiPiante(prev => !prev);
    }

    return (
        <Background>
            <NavBar/>

            <Titolo nome="Sviluppatore"/>

            <Button
                testo="TestWikiPiante"
                onPress={toggleTestWikiPiante}
                stileTesto={styles.titoloText}
                stileButton={styles.titoloButton}/>
            {testWikiPiante && (
                <TestWikiPiante/>
            )}
        </Background>
    )
}
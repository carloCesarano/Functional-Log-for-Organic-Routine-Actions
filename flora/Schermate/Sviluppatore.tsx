import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
// COMPONENTI NATIVE
import {Text} from 'react-native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar from '../Componenti/Comuni/NavBar';
import {TestWikiPiante} from '../Componenti/Schermate/Sviluppatore/TestWikiPiante';
import {styles} from '../Styles/Sviluppatore';

type Props = NativeStackScreenProps<RootStackParamList, 'Sviluppatore'>;

export default function Sviluppatore({navigation}: Props) {
    return (
        <Background>
            <NavBar/>

            <Text style={styles.titolo}>TestWikiPiante</Text>
            <TestWikiPiante/>
        </Background>
    )
}
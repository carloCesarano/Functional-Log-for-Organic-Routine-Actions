import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';

// DEFINISCO GLI INPUT
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'InfoPianta'>;
interface Props extends Partial<NavigationProps> {
    ID: number
}
export default function InfoPianta({ID}: Props) {
    const [editing, setEditing] = useState<boolean>(false);

    return (
        <Background>
            <NavBar/>
            <Titolo nome="InfoPianta"/>

            {/*
            {!editing && (
                <VisualizzaInfo id={ID}/>
            )}

            {editing && (
                <FormModifica id={ID}/>
            )}

            <Button> // Pulsante che elimina
            <Button> // Pulsante che fa il toggle tra modifica/visualizza
            */}

        </Background>
    )
}
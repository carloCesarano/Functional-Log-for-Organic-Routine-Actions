import {JSX, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';

// DEFINISCO GLI INPUT
type Props = NativeStackScreenProps<RootStackParamList, 'InfoPianta'>;

export default function ({route}: Props): JSX.Element {
    const {ID} = route.params;
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
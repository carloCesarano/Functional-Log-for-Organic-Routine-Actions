import {JSX, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
// COMPONENTI NATIVI
import {View} from 'react-native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';
import FormModifica from '../Componenti/Schermate/InfoPianta/FormModifica';
import VisualizzaInfo from '../Componenti/Schermate/InfoPianta/VisualizzaInfo';
import Button from '../Componenti/Comuni/Input/Button';

// DEFINISCO GLI INPUT
type Props = NativeStackScreenProps<RootStackParamList, 'InfoPianta'>;

export default function ({route}: Props): JSX.Element {
    const {ID} = route.params;
    const [editing, setEditing] = useState<boolean>(false);

    const editMode = () => {
        setEditing(true);
    }

    const salvaEdit = () => {
        setEditing(false);
    }

    return (
        <Background>
            <NavBar/>
            <Titolo nome="InfoPianta"/>

            {!editing && (
                <VisualizzaInfo id={ID}/>
            )}

            {editing && (
                <FormModifica id={1}/>
            )}

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 20}}>
                <Button testo='Elimina' stileButton={{width: '30%'}}/>
                {!editing && (
                    <Button
                        testo='Modifica'
                        onPress={editMode}
                        stileButton={{width: '30%'}}/>
                )}
                {editing && (
                    <Button
                        testo='Salva'
                        onPress={salvaEdit}
                        stileButton={{width: '30%'}}/>
                )}
            </View>

        </Background>
    )
}
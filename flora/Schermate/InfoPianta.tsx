import {JSX, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
// COMPONENTI NATIVI
import {ScrollView} from 'react-native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import FormModifica   from '../Componenti/Schermate/InfoPianta/FormModifica';
import VisualizzaInfo from '../Componenti/Schermate/InfoPianta/VisualizzaInfo';

// DEFINISCO GLI INPUT
type Props = NativeStackScreenProps<RootStackParamList, 'InfoPianta'>;

export default function ({route}: Props): JSX.Element {
    const {ID} = route.params;
    const [editing, setEditing] = useState<boolean>(false);

    return (
        <Background>
            <NavBar/>
            <ScrollView
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 18}}>

                {!editing && (
                    <VisualizzaInfo id={ID} edit={setEditing}/>
                )}

                {editing && (
                    <FormModifica id={1}/>
                )}
            </ScrollView>

        </Background>
    )
}
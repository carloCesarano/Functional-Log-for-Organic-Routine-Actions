import {Dispatch, JSX, SetStateAction, useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../types";
// COMPONENTI NATIVI
import {FlatList, View, Text, Alert} from 'react-native';
// COMPONENTI CUSTOM
import ImmaginePianta from './ImmaginePianta';
import InfoIntervento from './InfoIntervento';
import Button from '../../Comuni/Input/Button';
// UTILITY
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import {PiantaPosseduta} from '../../../Model/PiantaPosseduta';

interface Props {
    id: number,
    edit: Dispatch<SetStateAction<boolean>>
}

export default function ({id, edit}: Props): JSX.Element {
    const [pianta, setPianta] = useState<PiantaPosseduta | null>(null)

    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useFocusEffect(useCallback(() => {
        const caricaDati = async () => {
            setPianta(await PiantePosseduteDAO.get(id));
        };
        caricaDati();
    }, []));

    const renderCategoria = ({item}: {item: string}) => (
        <Text
            style={{backgroundColor: '#67d362', borderRadius: 8, padding: 8}}
        >{item}</Text>
    );

    const eliminaPianta = () => {
        if (!pianta) return;

        async function confermaElimina() {
            if (pianta === null) return;
            await PiantePosseduteDAO.remove(pianta);
            navigation.navigate('ListaPiante', {cercato: ''})
        }
        Alert.alert(
            'Conferma eliminazione',
            'Vuoi davvero eliminare ' + pianta?.getNome() + '?',
            [
                {
                    style: 'cancel',
                    text: 'No'
                },
                {
                    style: 'destructive',
                    text: 'Sì',
                    onPress: confermaElimina
                }
            ]
        )
    }

    return (
        <>
            <View
                style={{width: '90%', borderRadius: 25, borderStyle: 'solid', borderWidth: 3, backgroundColor: 'white', overflow: 'hidden'}}
            >
                <ImmaginePianta pianta={pianta}/>
                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{textAlign: 'center', marginTop: 12, fontWeight: '900', fontSize: 26}}>
                    {pianta?.getNome()}</Text>

                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{textAlign: 'center', marginTop: 8, fontSize: 18, fontStyle: 'italic'}}>
                    {pianta?.getSpecie().getSpecie()}</Text>

                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{textAlign: 'center', marginTop: 8, fontSize: 18}}>
                    Acquisita il: {pianta?.getAcq().toLocaleDateString()}</Text>

                <FlatList
                    data={pianta?.getCategorie()}
                    horizontal={true}
                    style={{marginTop: 12}}
                    contentContainerStyle={{paddingHorizontal: 16, gap: 16}}
                    keyExtractor={c => c}
                    renderItem={renderCategoria}/>

                <Text
                    numberOfLines={5}
                    ellipsizeMode='tail'
                    style={{textAlign: 'center', marginTop: 8, fontSize: 14, fontStyle: 'italic'}}>
                    "{pianta?.getNote()}"</Text>

                <InfoIntervento
                    pianta={pianta}
                    tipo='INN'
                    setPianta={setPianta}/>

                <InfoIntervento
                    pianta={pianta}
                    tipo='POT'
                    setPianta={setPianta}/>

                <InfoIntervento
                    pianta={pianta}
                    tipo='RINV'
                    setPianta={setPianta}/>
            </View>

            <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', gap: 16, marginTop: 18 }}>
                <Button
                    testo='Elimina'
                    stileButton={{width: '50%',height: 60, borderRadius: 18, backgroundColor: 'red',}}
                    stileTesto={{textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold',}}
                    onPress={eliminaPianta}/>
                <Button
                    testo='Modifica'
                    stileButton={{width: '50%',height: 60, borderRadius: 18, backgroundColor: '#30a505',}}
                    stileTesto={{textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold',}}
                    onPress={() => edit(true)}/>
            </View>
        </>
    )
}
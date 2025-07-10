import {JSX, useCallback, useState} from 'react';
import {FlatList, ScrollView, Text} from 'react-native';
import {PiantaPosseduta} from '../../../Model/PiantaPosseduta';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import {useFocusEffect} from '@react-navigation/native';
import ImmaginePianta from './ImmaginePianta';
import InfoIntervento from "./InfoIntervento";

interface Props {
    id: number
}

export default function ({id}: Props): JSX.Element {
    const [pianta, setPianta] = useState<PiantaPosseduta | null>(null)

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
    )

    return (
        <ScrollView
            style={{width: '90%', borderRadius: 25, borderStyle: 'solid', borderWidth: 3, backgroundColor: 'white'}}
            contentContainerStyle={{width: '100%'}}
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
        </ScrollView>
    )
}
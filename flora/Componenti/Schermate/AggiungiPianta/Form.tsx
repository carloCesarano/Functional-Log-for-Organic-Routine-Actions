import React, {JSX, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
// COMPONENTI NATIVI
import {TextInput, ScrollView} from 'react-native';
// COMPONENTI CUSTOM
import Titolo from '../../Comuni/Titolo';
import FotoPicker     from '../../Comuni/Input/FotoPicker';
import DataPicker     from '../../Comuni/Input/DataPicker';
import PickerSingolo  from '../../Comuni/Input/PickerSingolo';
import PickerMultiplo from '../../Comuni/Input/PickerMultiplo';
import Button         from '../../Comuni/Input/Button';
// UTILITY
import {PiantaPosseduta} from '../../../Model/PiantaPosseduta';
import * as WikiPianteDAO from '../../../Database/WikiPianteDAO';
import * as CategorieDAO  from '../../../Database/CategorieDAO';
import {MostraToast} from '../../Comuni/MessaggioToast';
// FOGLI DI STILE
import {styles} from '../../../Styles/Form';

export default function (): JSX.Element {
    // VARIABILI DI STATO
    const [foto, setFoto] = useState<any>(null);
    const [nome, setNome] = useState<string>('');
    const [acq, setAcq] = useState<Date>(new Date());
    const [catSel, setCatSel] = useState<string[]>([]);
    const [specie, setSpecie] = useState<string | null>(null);
    const [ultInn, setUltInn] = useState<Date>(new Date());
    const [ultPot, setUltPot] = useState<Date>(new Date());
    const [ultRinv, setUltRinv] = useState<Date>(new Date());
    const [note, setNote] = useState<string>('');

    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // DATI DA CARICARE
    const [allSpecie, setAllSpecie] = useState<string[]>([]);
    useEffect(() => {
        const getAllSpecie = async () => {
            const tabella = await WikiPianteDAO.getAll();
            setAllSpecie(tabella
                .map(w => w.getSpecie())
                .sort()
            );
        }
        getAllSpecie();
    }, []);

    const [allCat, setAllCat] = useState<string[]>([]);
    useEffect(() => {
        const getAllCategorie = async () => {
            const tabella = await CategorieDAO.getAll();
            setAllCat(tabella.map(riga => riga.nome).sort());
        };
        getAllCategorie();
    }, []);

    // VARIABILI DI UTILITY
    const [altezzaNoteInput, setAltezzaNoteInput] = useState<number>(44);

    const aggiungi = async () => {
        if (!nome.trim() || !specie) {
            MostraToast({
                tipo: 'error',
                titolo: 'Impossibile creare la pianta',
                messaggio: 'Il nome e la specie sono obbligatori'
            });
            return;
        }

        const pianta: PiantaPosseduta = await PiantaPosseduta.creaNuova({
            foto: foto?.uri ?? '',
            nome: nome.trim(),
            acq: acq.toISOString().split('T')[0],
            specie: specie,
            note: note
        }, ultInn, ultPot, ultRinv);

        MostraToast({
            tipo: 'success',
            titolo: 'Nuova pianta aggiunta',
            messaggio: 'Prenditi cura della tua nuova pianta di ' + pianta.getSpecie().getSpecie()
        });

        navigation.navigate('InfoPianta', {ID: pianta.getId()})

    }

    return (
        <ScrollView
            style={{width: '100%'}}
            contentContainerStyle={{gap: 16, alignItems: 'center', width: '100%', paddingBottom: 100}}>

            <Titolo nome='Nuova pianta' />

            <FotoPicker
                foto={foto}
                setFoto={setFoto}/>

            <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder='Nome'
                placeholderTextColor={'#888'}
                style={styles.textInput}/>

            <DataPicker
                valore={acq}
                onChange={setAcq}
                nome='Acquisizione'
                maxValore={new Date()}/>

            <PickerSingolo
                titolo={'Specie'}
                opzioni={allSpecie.map(s => {return {label: s, value: s}})}
                selezionato={specie}
                onCambia={setSpecie}/>

            <PickerMultiplo
                titolo={'Categorie'}
                opzioni={allCat.map(s => {return {label: s, value: s}})}
                selezionati={catSel}
                onCambia={setCatSel}/>

            <TextInput
                value={note}
                onChangeText={setNote}
                multiline={true}
                placeholder='Note'
                placeholderTextColor='#888'
                onContentSizeChange={e => setAltezzaNoteInput(e.nativeEvent.contentSize.height)}
                style={[styles.textInput, {height: Math.max(44, altezzaNoteInput)}]}/>

            <DataPicker
                valore={ultInn}
                onChange={setUltInn}
                nome='Ultima innaffiatura'
                minValore={acq}
                maxValore={new Date()}/>

            <DataPicker
                valore={ultPot}
                onChange={setUltPot}
                nome='Ultima potatura'
                minValore={acq}
                maxValore={new Date()}/>

            <DataPicker
                valore={ultRinv}
                onChange={setUltRinv}
                nome='Ultimo rinvaso'
                minValore={acq}
                maxValore={new Date()}/>

            <Button
                testo='+'
                stileButton={{width: 60, height: 60, borderRadius: 50, backgroundColor: '#30a505', alignItems: 'center', justifyContent: 'center'}}
                stileTesto={{textAlign: 'center', fontSize: 48, color: 'white', fontWeight: 'bold'}}
                onPress={aggiungi}/>

        </ScrollView>
    )
}
import React, {JSX, useEffect, useState} from 'react';
// COMPONENTI NATIVI
import {TextInput, ScrollView} from 'react-native';
// COMPONENTI CUSTOM
import FotoPicker from '../../Comuni/Input/FotoPicker';
import DataPicker from '../../Comuni/Input/DataPicker';
import PickerMultiplo from "../../Comuni/Input/PickerMultiplo";
import PickerSingolo from "../../Comuni/Input/PickerSingolo";
// UTILITY
import * as WikiPianteDAO from '../../../Database/WikiPianteDAO';
import * as CategorieDAO from '../../../Database/CategorieDAO';
import {MostraToast} from '../../Comuni/MessaggioToast';
// FOGLI DI STILE
import {styles} from '../../../Styles/Form';
import Button from "../../Comuni/Input/Button";
import {PiantaPosseduta} from "../../../Model/PiantaPosseduta";

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

    }

    return (
        <ScrollView
            style={{width: '100%'}}
            contentContainerStyle={{gap: 16, alignItems: 'center', width: '100%', paddingBottom: 100}}>

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
                testo='Aggiungi'
                onPress={aggiungi}/>

        </ScrollView>
    )
}
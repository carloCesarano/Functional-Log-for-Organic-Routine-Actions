import React, {JSX, useEffect, useState} from 'react';
import {TextInput, ScrollView} from 'react-native';
import FotoPicker from '../../Comuni/Input/FotoPicker';
import {styles} from '../../../Styles/Form';
import DataPicker from '../../Comuni/Input/DataPicker';
import * as WikiPianteDAO from '../../../Database/WikiPianteDAO';
import * as CategorieDAO from '../../../Database/CategorieDAO';
import PickerMultiplo from "../../Comuni/Input/PickerMultiplo";
import PickerSingolo from "../../Comuni/Input/PickerSingolo";

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
                style={styles.textInput}
            />

            <DataPicker
                valore={acq}
                onChange={setAcq}
                nome='Acquisizione'
                maxValore={new Date()}/>

            <PickerSingolo
                titolo={'Specie'}
                opzioni={allSpecie.map(s => {return {label: s, value: s}})}
                selezionato={specie}
                onCambia={setSpecie}
            />

            <PickerMultiplo
                titolo={'Categorie'}
                opzioni={allCat.map(s => {return {label: s, value: s}})}
                selezionati={catSel}
                onCambia={setCatSel}
                />
        </ScrollView>
    )
}
import {JSX, useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import FotoPicker from '../../Comuni/Input/FotoPicker';
import {styles} from '../../../Styles/Form';
import DataPicker from '../../Comuni/Input/DataPicker';
import SinglePicker from "../../Comuni/Input/SinglePicker";
import * as WikiPianteDAO from '../../../Database/WikiPianteDAO';

export default function (): JSX.Element {
    // VARIABILI DI STATO
    const [foto, setFoto] = useState<any>(null);
    const [nome, setNome] = useState<string>('');
    const [acq, setAcq] = useState<Date>(new Date());
    const [catSel, setCatSel] = useState<string[]>([]);
    const [specie, setSpecie] = useState<string>('');
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

    return (
        <View
            style={{gap: 16, alignItems: 'center', width: '100%'}}>

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

            <SinglePicker
                valore={specie}
                onCambio={setSpecie}
                placeholder='Specie'
                opzioni={allSpecie}
                />
        </View>
    )
}
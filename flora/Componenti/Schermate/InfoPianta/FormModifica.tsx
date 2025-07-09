import React, { JSX, useEffect, useState } from 'react';
import { ScrollView, TextInput,View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

// COMPONENTI CUSTOM
import FotoPicker from '../../Comuni/Input/FotoPicker';
import DataPicker from '../../Comuni/Input/DataPicker';
import PickerSingolo from '../../Comuni/Input/PickerSingolo';
import PickerMultiplo from '../../Comuni/Input/PickerMultiplo';
import Button from '../../Comuni/Input/Button';
import { MostraToast } from '../../Comuni/MessaggioToast';

// STILI
import { styles } from '../../../Styles/Form';

// MODEL E DAO
import { PiantaPosseduta } from '../../../Model/PiantaPosseduta';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import * as WikiPianteDAO from '../../../Database/WikiPianteDAO';
import * as CategorieDAO from '../../../Database/CategorieDAO';


// PROPS
type Props = {
    id: number;
};

export default function FormModifica({ id }: Props): JSX.Element {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // Stato form
    const [foto, setFoto] = useState<any>(null);
    const [nome, setNome] = useState<string>('');
    const [acq, setAcq] = useState<Date>(new Date());
    const [specie, setSpecie] = useState<string | null>(null);
    const [catSel, setCatSel] = useState<string[]>([]);
    const [note, setNote] = useState<string>('');

    const [altezzaNoteInput, setAltezzaNoteInput] = useState<number>(44);

    const [pianta, setPianta] = useState<PiantaPosseduta | null>(null);
    const [allSpecie, setAllSpecie] = useState<string[]>([]);
    const [allCat, setAllCat] = useState<string[]>([]);

    // Carica dati pianta e opzioni
    useEffect(() => {
        const caricaDati = async () => {
            try {
                const p = await PiantePosseduteDAO.get(id);
                if (!p) {
                    MostraToast({ tipo: 'error', titolo: 'Errore', messaggio: 'Pianta non trovata' });
                    return;
                }

                setPianta(p);
                setFoto(p.getFoto());
                setNome(p.getNome());
                setNote(p.getNote());
                setSpecie(p.getSpecie().getSpecie());
                setAcq(new Date(p.getAcq()));
                setCatSel(p.getCategorie());

                const specieList = await WikiPianteDAO.getAll();
                setAllSpecie(specieList.map(s => s.getSpecie()).sort());

                const categorieList = await CategorieDAO.getAll();
                setAllCat(categorieList.map(c => c.nome).sort());
            } catch (err) {
                console.error(err);
                MostraToast({ tipo: 'error', titolo: 'Errore', messaggio: 'Errore nel caricamento dati' });
            }
        };

        caricaDati();
    }, [id]);

    // Salva modifiche
    const salvaModifiche = async () => {
        if (!nome.trim() || !specie) {
            MostraToast({
                tipo: 'error',
                titolo: 'Impossibile salvare',
                messaggio: 'Il nome e la specie sono obbligatori'
            });
            return;
        }

        try {
            //dati della pianta corrente per mantenere le date originali
            const pianta = await PiantePosseduteDAO.get(id);

            //nuova istanza con i dati modificati dell’utente
            pianta.nome = nome.trim();
            pianta.foto = foto?.uri ?? '';
            pianta.acq = acq;
            pianta.specie = await WikiPianteDAO.get(specie);
            pianta.note = note ?? '';
            pianta.categorie = catSel;

            await PiantePosseduteDAO.update(pianta);

            MostraToast({
                tipo: 'success',
                titolo: 'Modifica salvata',
                messaggio: 'La pianta è stata aggiornata correttamente.'
            });

            navigation.goBack();

        } catch (e) {
            MostraToast({
                tipo: 'error',
                titolo: 'Errore',
                messaggio: 'Impossibile salvare la pianta. Riprova.'
            });
            console.error(e);
        }
    };



    return (
        <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{ gap: 16, alignItems: 'center', width: '100%', paddingBottom: 100 }}
        >
            <FotoPicker foto={foto} setFoto={setFoto} />

            <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Nome"
                placeholderTextColor="#888"
                style={styles.textInput}
            />

            <DataPicker
                valore={acq}
                onChange={setAcq}
                nome="Acquisizione"
                maxValore={new Date()}
            />

            <PickerSingolo
                titolo="Specie"
                opzioni={allSpecie.map(s => ({ label: s, value: s }))}
                selezionato={specie}
                onCambia={setSpecie}
            />

            <PickerMultiplo
                titolo="Categorie"
                opzioni={allCat.map(c => ({ label: c, value: c }))}
                selezionati={catSel}
                onCambia={setCatSel}
            />

            <TextInput
                value={note}
                onChangeText={setNote}
                multiline
                placeholder="Note"
                placeholderTextColor="#888"
                onContentSizeChange={e => setAltezzaNoteInput(e.nativeEvent.contentSize.height)}
                style={[styles.textInput, { height: Math.max(44, altezzaNoteInput) }]}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', gap: 16 }}>
            <Button
                testo="Salva"
                stileButton={{width: '50%',height: 60, borderRadius: 18, backgroundColor: '#30a505',}}
                stileTesto={{textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold',}}
                onPress={salvaModifiche}
            />
            <Button
                testo='Annulla'
                stileButton={{ width: '50%', height: 60, borderRadius: 18, backgroundColor: '#c00' }}
                stileTesto={{ textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold' }}
                onPress={() => navigation.goBack()}
                />
            </View>
        </ScrollView>
    );
}

import {useState} from 'react';
// COMPONENTI NATIVI
import {Modal, KeyboardAvoidingView, TouchableOpacity, View, Text, TextInput, Platform} from 'react-native';
// COMPONENTI CUSTOM
import Button from '../../Comuni/Input/Button';
// UTILITY
import * as CategorieDAO from '../../../Database/CategorieDAO';
import {isPortrait} from '../../Comuni/OrientazioneChecker';
import {MostraToast} from '../../Comuni/MessaggioToast';
// FOGLI DI STILE
import {PORTRAIT, LANDSCAPE} from '../../../Styles/AggiungiCategoriaButtonStyles';

interface Props {
    onCategoriaAggiunta: () => void;
}

export default function AggiungiCategoriaButton({onCategoriaAggiunta}: Props) {
    // VARIABILI DI STATO

    // Mostra o nasconde il modale per aggiungere una nuova categoria
    const [showInput, setShowInput] = useState(false);

    // Contiene il testo digitato dall’utente per la nuova categoria
    const [nomeNuovaCategoria, setNomeNuovaCategoria] = useState('');

    // Determina quale stile usare in base all’orientamento
    const portraitMode = isPortrait();
    const stile = portraitMode ? PORTRAIT : LANDSCAPE;

    // CHIAMATA QUANDO:
    // L'utente preme "Salva" per aggiungere una nuova categoria.
    //
    // COSA FA:
    // - Controlla che il nome non sia vuoto;
    // - Verifica se la categoria esiste già nel DB;
    // - Se tutto è valido, la inserisce nel DB.
    const aggiungiCategoria = async () => {
        const nomePulito = nomeNuovaCategoria.trim();

        if (nomePulito.length === 0) {
            MostraToast({
                tipo: 'error',
                titolo: 'Nome non valido',
                messaggio: 'Inserisci un nome valido'
            });
            return;
        }

        try {
            // Controlla se esiste già una categoria con lo stesso nome
            const esisteGia = await CategorieDAO.daNome(nomePulito).then(() => true).catch(() => false);
            if (esisteGia) {
                MostraToast({
                    tipo: 'error',
                    titolo: 'Nome non valido',
                    messaggio: 'La categoria ' + nomePulito + ' esiste già'
                });
                return;
            }

            // Inserisce la nuova categoria nel database
            await CategorieDAO.insert(nomePulito);
            MostraToast({
                tipo: 'success',
                titolo: 'Aggiunta con successo',
                messaggio: 'La categoria ' + nomePulito + ' è stata aggiunta'
            });
            setNomeNuovaCategoria('');
            setShowInput(false);
            onCategoriaAggiunta(); // Notifica il componente genitore
        } catch (error) {
            MostraToast({
                tipo: 'error',
                titolo: 'Impossibile aggiungere la categoria',
                messaggio: 'Controlla la console per maggiori informazioni'
            });
            console.error(error);
        }
    };

    return (
        <>
            {/* BOTTONE "AGGIUNGI CATEGORIA"
                - Apre il modale per inserire una nuova categoria */}
            <TouchableOpacity style={stile.bottone} onPress={() => setShowInput(true)}>
                <Text style={stile.testoBottone}>Aggiungi</Text>
            </TouchableOpacity>

            {/* MODALE CON INPUT PER LA NUOVA CATEGORIA */}
            <Modal
                visible={showInput}
                transparent
                animationType="slide"
                onRequestClose={() => setShowInput(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={stile.modalContainer}
                >
                    <View style={stile.modalContent}>
                        {/* CAMPO DI TESTO DOVE L’UTENTE DIGITA IL NOME */}
                        <TextInput
                            placeholder="Nuovo nome categoria"
                            value={nomeNuovaCategoria}
                            onChangeText={setNomeNuovaCategoria}
                            style={stile.input}
                            autoFocus
                        />
                        {/* BOTTONI "SALVA" E "ANNULLA" */}
                        <View style={stile.buttonRow}>
                            <Button testo="Salva"
                                    onPress={aggiungiCategoria}
                                    stileButton={{
                                        width: '50%',
                                        height: 60,
                                        borderRadius: 18,
                                        backgroundColor: '#30a505'
                                    }}
                                    stileTesto={{textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold'}}
                            />
                            <Button
                                testo="Annulla"
                                onPress={() => {
                                    setShowInput(false);
                                    setNomeNuovaCategoria('');
                                }}
                                stileButton={{width: '50%', height: 60, borderRadius: 18, backgroundColor: '#30a505'}}
                                stileTesto={{textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold'}}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
}

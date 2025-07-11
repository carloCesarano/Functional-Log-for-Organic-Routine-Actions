import {useState, useEffect} from 'react';
// COMPONENTI NATIVI
import {Modal, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, View, Text, TextInput, Keyboard, Platform} from 'react-native';
// COMPONENTI CUSTOM
import Button from '../../Comuni/Input/Button';
// UTILITY
import * as CategorieDAO from '../../../Database/CategorieDAO';
import {isPortrait} from '../../Comuni/OrientazioneChecker';
import {MostraToast} from '../../Comuni/MessaggioToast';
// FOGLI DI STILE
import {PORTRAIT, LANDSCAPE} from '../../../Styles/ModificaCategorieButtonStyles';

interface Props {
    categoriaSelezionata: { id: number; nome: string } | null;
    onCategoriaModificata: () => void;
}

export default function ModificaCategoriaButton({categoriaSelezionata, onCategoriaModificata}: Props) {
    // VARIABILI DI STATO

    // Stato che controlla la visibilità del pop-up di modifica
    const [showInput, setShowInput] = useState(false);

    // Stato che contiene il nuovo nome da assegnare alla categoria
    const [nomeModificato, setNomeModificato] = useState('');

    // Determina lo stile da usare in base all'orientamento
    const portraitMode = isPortrait();
    const stile = portraitMode ? PORTRAIT : LANDSCAPE;

    // CHIAMATA QUANDO:
    // Cambia la categoria selezionata dall’esterno del componente.
    //
    // COSA FA:
    // Aggiorna il campo di testo col nome attuale della categoria
    // o lo azzera e chiude l’input se non c’è nulla selezionato.
    useEffect(() => {
        if (categoriaSelezionata) {
            setNomeModificato(categoriaSelezionata.nome);
        } else {
            setNomeModificato('');
            setShowInput(false);
        }
    }, [categoriaSelezionata]);

    // CHIAMATA QUANDO:
    // L'utente preme "Salva" per modificare una categoria.
    //
    // COSA FA:
    // Controlla validità input, salva nel DB e aggiorna lo stato.
    const modificaCategoria = async () => {
        if (!categoriaSelezionata) {
            MostraToast({
                tipo: 'error',
                titolo: 'Nessuna categoria selezionata',
                messaggio: 'Seleziona una categoria per modificarla'
            });
            return;
        }

        const nomePulito = nomeModificato.trim();

        if (nomePulito.length === 0) {
            MostraToast({
                tipo: 'error',
                titolo: 'Nome non valido',
                messaggio: 'Inserisci un nome valido'
            });
            return;
        }

        if (nomePulito === categoriaSelezionata.nome) {
            MostraToast({
                tipo: 'warn',
                titolo: 'Nome non modificato',
                messaggio: 'La categoria non è stata modificata'
            });
            setShowInput(false);
            return;
        }

        try {
            await CategorieDAO.update({
                vecchio: categoriaSelezionata.nome,
                nuovo: nomePulito
            });
            MostraToast({
                tipo: 'success',
                titolo: 'Modificata con successo',
                messaggio: 'La nuova categoria ora è ' + nomePulito
            });
            setShowInput(false);
            onCategoriaModificata(); // Notifica il componente genitore
        } catch (error) {
            MostraToast({
                tipo: 'error',
                titolo: 'Impossibile modificare la categoria',
                messaggio: 'Controlla la console per maggiori informazioni'
            });
            console.error(error);
        }
    };

    return (
        <>
            {/* BOTTONE "MODIFICA CATEGORIA"
                - Disabilitato se nessuna categoria è selezionata
                - Apre il pop-up per modificare il nome */}
            <TouchableOpacity
                style={[
                    stile.bottone,
                    !categoriaSelezionata && {backgroundColor: '#ccc'},
                ]}
                onPress={() => categoriaSelezionata && setShowInput(true)}
                disabled={!categoriaSelezionata}
            >
                <Text style={stile.testoBottone}>Modifica</Text>
            </TouchableOpacity>

            {/* MODALE PER L'INSERIMENTO DEL NUOVO NOME CATEGORIA */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showInput}
                onRequestClose={() => setShowInput(false)}
            >
                {/* Chiude la tastiera se l’utente tocca fuori dall’input */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={stile.modalOverlay}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={stile.modalContainer}
                        >
                            <View style={stile.modalContent}>
                                {/* CAMPO DI TESTO CON IL NOME CATEGORIA MODIFICABILE */}
                                <TextInput
                                    value={nomeModificato}
                                    onChangeText={setNomeModificato}
                                    style={stile.input}
                                    autoFocus
                                    placeholder="Nuovo nome categoria"
                                />
                                {/* BOTTONI: SALVA / ANNULLA */}
                                <View style={stile.buttonRow}>
                                    <Button testo="Salva"
                                            onPress={modificaCategoria}
                                            stileButton={{
                                                width: '50%',
                                                height: 60,
                                                borderRadius: 18,
                                                backgroundColor: '#30a505'
                                            }}
                                            stileTesto={{
                                                textAlign: 'center',
                                                fontSize: 24,
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}
                                    />
                                    <Button
                                        testo="Annulla"
                                        onPress={() => {
                                            setShowInput(false);
                                            setNomeModificato(categoriaSelezionata?.nome || '');
                                        }}
                                        stileButton={{
                                            width: '50%',
                                            height: 60,
                                            borderRadius: 18,
                                            backgroundColor: '#30a505'
                                        }}
                                        stileTesto={{
                                            textAlign: 'center',
                                            fontSize: 24,
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}

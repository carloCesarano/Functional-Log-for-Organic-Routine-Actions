import React, { useState, useEffect } from 'react';
import {
    Modal,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TextInput,
    Button,
    Alert,
    TouchableOpacity,
    Text
} from 'react-native';

import * as CategorieDAO from '../../../Database/CategorieDAO';
import { isPortrait } from '../../Comuni/OrientazioneChecker';
import { PORTRAIT, LANDSCAPE } from '../../../Styles/ModificaCategorieButtonStyles';

interface Props {
    categoriaSelezionata: { id: number; nome: string } | null;
    onCategoriaModificata: () => void;
}

export default function ModificaCategoriaButton({ categoriaSelezionata, onCategoriaModificata }: Props) {
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
            Alert.alert('Errore', 'Nessuna categoria selezionata');
            return;
        }

        const nomePulito = nomeModificato.trim();

        if (nomePulito.length === 0) {
            Alert.alert('Errore', 'Inserisci un nome valido');
            return;
        }

        if (nomePulito === categoriaSelezionata.nome) {
            Alert.alert('Attenzione', 'Il nome non è stato modificato');
            setShowInput(false);
            return;
        }

        try {
            await CategorieDAO.update({
                vecchio: categoriaSelezionata.nome,
                nuovo: nomePulito
            });
            Alert.alert('Successo', 'Categoria modificata');
            setShowInput(false);
            onCategoriaModificata(); // Notifica il componente genitore
        } catch (error) {
            Alert.alert('Errore', 'Impossibile modificare la categoria');
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
                    !categoriaSelezionata && { backgroundColor: '#ccc' },
                ]}
                onPress={() => categoriaSelezionata && setShowInput(true)}
                disabled={!categoriaSelezionata}
            >
                <Text style={stile.testoBottone}>Modifica Categoria</Text>
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
                                    <Button title="Salva" onPress={modificaCategoria} color="green" />
                                    <Button
                                        title="Annulla"
                                        onPress={() => {
                                            setShowInput(false);
                                            setNomeModificato(categoriaSelezionata?.nome || '');
                                        }}
                                        color="red"
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

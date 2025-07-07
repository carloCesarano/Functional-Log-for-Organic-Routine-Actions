import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Text,
    Modal,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import * as CategorieDAO from '../../../Database/CategorieDAO';
import { isPortrait } from '../../Comuni/OrientazioneChecker';
import { PORTRAIT, LANDSCAPE } from '../../../Styles/AggiungiCategoriaButtonStyles';

interface Props {
    onCategoriaAggiunta: () => void;
}

export default function AggiungiCategoriaButton({ onCategoriaAggiunta }: Props) {
    const [showInput, setShowInput] = useState(false);
    const [nomeNuovaCategoria, setNomeNuovaCategoria] = useState('');
    const portraitMode = isPortrait();
    const stile = portraitMode ? PORTRAIT : LANDSCAPE;

    const aggiungiCategoria = async () => {
        const nomePulito = nomeNuovaCategoria.trim();
        if (nomePulito.length === 0) {
            Alert.alert('Errore', 'Inserisci un nome valido per la categoria');
            return;
        }

        try {
            const esisteGia = await CategorieDAO.daNome(nomePulito).then(() => true).catch(() => false);
            if (esisteGia) {
                Alert.alert('Errore', 'Questa categoria esiste già');
                return;
            }

            await CategorieDAO.insert(nomePulito);
            Alert.alert('Successo', 'Categoria aggiunta con successo!');
            setNomeNuovaCategoria('');
            setShowInput(false);
            onCategoriaAggiunta();
        } catch (error) {
            Alert.alert('Errore', 'Impossibile aggiungere categoria');
            console.error(error);
        }
    };

    return (
        <>
            <TouchableOpacity style={stile.bottone} onPress={() => setShowInput(true)}>
                <Text style={stile.testoBottone}>Aggiungi Categoria</Text>
            </TouchableOpacity>

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
                        <TextInput
                            placeholder="Nuovo nome categoria"
                            value={nomeNuovaCategoria}
                            onChangeText={setNomeNuovaCategoria}
                            style={stile.input}
                            autoFocus
                        />
                        <View style={stile.buttonRow}>
                            <Button title="Salva" onPress={aggiungiCategoria} color="green" />
                            <Button
                                title="Annulla"
                                onPress={() => {
                                    setShowInput(false);
                                    setNomeNuovaCategoria('');
                                }}
                                color="red"
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
}



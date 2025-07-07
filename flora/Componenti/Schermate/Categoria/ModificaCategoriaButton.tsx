import React, { useState } from 'react';
import { Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import * as CategorieDAO from '../../../Database/CategorieDAO';
import { isPortrait } from '../../Comuni/OrientazioneChecker';
import { PORTRAIT, LANDSCAPE } from '../../../Styles/ModificaCategorieButtonStyles';

interface Props {
    categoriaSelezionata: { id: number; nome: string } | null;
    onCategoriaModificata: () => void;
}

export default function ModificaCategoriaButton({ categoriaSelezionata, onCategoriaModificata }: Props) {
    const [showInput, setShowInput] = useState(false);
    const [nomeModificato, setNomeModificato] = useState('');
    const portraitMode = isPortrait();
    const stile = portraitMode ? PORTRAIT : LANDSCAPE;

    // Se cambia la categoria selezionata, aggiorna il valore nell'input
    React.useEffect(() => {
        if (categoriaSelezionata) {
            setNomeModificato(categoriaSelezionata.nome);
        } else {
            setNomeModificato('');
            setShowInput(false);
        }
    }, [categoriaSelezionata]);

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
            await CategorieDAO.update({ vecchio: categoriaSelezionata.nome, nuovo: nomePulito });
            Alert.alert('Successo', 'Categoria modificata');
            setShowInput(false);
            onCategoriaModificata();
        } catch (error) {
            Alert.alert('Errore', 'Impossibile modificare la categoria');
            console.error(error);
        }
    };

return(
    <>
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

        <Modal
            animationType="slide"
            transparent={true}
            visible={showInput}
            onRequestClose={() => setShowInput(false)}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={stile.modalOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={stile.modalContainer}
                    >
                        <View style={stile.modalContent}>
                            <TextInput
                                value={nomeModificato}
                                onChangeText={setNomeModificato}
                                style={stile.input}
                                autoFocus
                                placeholder="Nuovo nome categoria"
                            />
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



import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import * as CategorieDAO from '../../../Database/CategorieDAO';

interface Props {
    categoriaSelezionata: { id: number; nome: string } | null;
    onCategoriaModificata: () => void;
}

export default function ModificaCategoriaButton({ categoriaSelezionata, onCategoriaModificata }: Props) {
    const [showInput, setShowInput] = useState(false);
    const [nomeModificato, setNomeModificato] = useState('');

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


    if (!categoriaSelezionata) {
        return null; // oppure un messaggio "Seleziona una categoria"
    }

    if (!showInput) {
        return (
            <TouchableOpacity style={styles.bottone} onPress={() => setShowInput(true)}>
                <Text style={styles.testoBottone}>Modifica Categoria</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.containerInput}>
            <TextInput
                value={nomeModificato}
                onChangeText={setNomeModificato}
                style={styles.input}
                autoFocus
            />
            <Button title="Salva" onPress={modificaCategoria} />
            <Button
                title="Annulla"
                onPress={() => {
                    setShowInput(false);
                    setNomeModificato(categoriaSelezionata.nome);
                }}
                color="red"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    bottone: {
        backgroundColor: '#2196f3',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
    },
    testoBottone: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    containerInput: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        gap: 10,
    },
    input: {
        flex: 1,
        borderColor: '#2196f3',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
    },
});


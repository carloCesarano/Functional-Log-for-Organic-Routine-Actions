import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import * as CategorieDAO from '../../../Database/CategorieDAO';

interface Props {
    onCategoriaAggiunta: () => void; // callback per aggiornare la lista in parent
}

export default function AggiungiCategoriaButton({ onCategoriaAggiunta }: Props) {
    const [showInput, setShowInput] = useState(false);
    const [nomeNuovaCategoria, setNomeNuovaCategoria] = useState('');

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
            onCategoriaAggiunta(); // aggiorna lista
        } catch (error) {
            Alert.alert('Errore', 'Impossibile aggiungere categoria');
            console.error(error);
        }
    };

    if (!showInput) {
        return (
            <TouchableOpacity style={styles.bottone} onPress={() => setShowInput(true)}>
                <Text style={styles.testoBottone}>+ Aggiungi Categoria</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.containerInput}>
            <TextInput
                placeholder="Nuovo nome categoria"
                value={nomeNuovaCategoria}
                onChangeText={setNomeNuovaCategoria}
                style={styles.input}
                autoFocus
            />
            <Button title="Salva" onPress={aggiungiCategoria} />
            <Button title="Annulla" onPress={() => { setShowInput(false); setNomeNuovaCategoria(''); }} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    bottone: {
        backgroundColor: '#4caf50',
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
        borderColor: '#4caf50',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
    },
});

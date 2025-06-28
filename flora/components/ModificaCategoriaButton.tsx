import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert, Modal } from "react-native";
import Button from "./Button";
import { update } from "../database/CategorieDAO";
import { modificaCategoriaStyles as styles } from "../styles/modificaCategoria";

interface ModificaCategoriaButtonProps {
    onModificaCompletata: () => void;
    categoriaSelezionata: string | null;
    categorieEsistenti: string[];
}

const ModificaCategoriaButton: React.FC<ModificaCategoriaButtonProps> = ({
                                                                             onModificaCompletata,
                                                                             categoriaSelezionata,
                                                                             categorieEsistenti
                                                                         }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [nuovoNome, setNuovoNome] = useState(categoriaSelezionata || "");

    const handleModificaCategoria = async () => {
        if (!categoriaSelezionata) {
            Alert.alert("Errore", "Nessuna categoria selezionata");
            return;
        }

        if (!nuovoNome.trim()) {
            Alert.alert("Errore", "Inserisci un nome valido per la categoria");
            return;
        }

        if (categoriaSelezionata === nuovoNome) {
            Alert.alert("Errore", "Il nuovo nome deve essere diverso dall'attuale");
            return;
        }

        if (categorieEsistenti.includes(nuovoNome)) {
            Alert.alert("Errore", "Questa categoria esiste già");
            return;
        }

        try {
            await update(categoriaSelezionata, nuovoNome);
            setModalVisible(false);
            onModificaCompletata();
            Alert.alert("Successo", "Categoria modificata con successo!");
        } catch (error) {
            Alert.alert("Errore", error instanceof Error ? error.message : "Errore durante la modifica");
        }
    };

    return (
        <View style={styles.modificaContainer}>
            <Button
                title="Modifica Categoria"
                onPress={() => {
                    if (categoriaSelezionata) {
                        setNuovoNome(categoriaSelezionata);
                        setModalVisible(true);
                    } else {
                        Alert.alert("Errore", "Seleziona una categoria da modificare");
                    }
                }}
                disabled={!categoriaSelezionata}
            />

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nuovo nome categoria"
                            value={nuovoNome}
                            onChangeText={setNuovoNome}
                            autoFocus={true}
                        />

                        <View style={styles.buttonRow}>
                            <Button
                                title="Annulla"
                                onPress={() => {
                                    setNuovoNome("");
                                    setModalVisible(false);
                                }}
                            />

                            <Button
                                title="Conferma"
                                onPress={handleModificaCategoria}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ModificaCategoriaButton;
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert, Modal } from "react-native";
import Button from "./Button";
import { update } from "../database/CategorieDAO";
import {aggiungiCategoriaStyles as styles} from "../styles/aggiungiCategoria";

interface AggiungiCategoriaButtonProps {
    onAggiuntaCompletata: () => void;
}

const AggiungiCategoriaButton: React.FC<AggiungiCategoriaButtonProps> = ({
                                                                             onAggiuntaCompletata
                                                                         }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [nuovaCategoria, setNuovaCategoria] = useState("");

    const handleAggiungiCategoria = async () => {
        if (!nuovaCategoria.trim()) {
            Alert.alert("Errore", "Inserisci un nome valido per la categoria");
            return;
        }

        try {
            await update(nuovaCategoria, nuovaCategoria);
            setNuovaCategoria("");
            setModalVisible(false);
            onAggiuntaCompletata();
            Alert.alert("Successo", "Categoria aggiunta con successo!");
        } catch (error) {
            Alert.alert("Errore", error instanceof Error ? error.message : "Errore sconosciuto");
        }
    };

    return (
        <View style={styles.container}>
            <Button
                title="Aggiungi Categoria"
                onPress={() => setModalVisible(true)}
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
                            placeholder="Nome della nuova categoria"
                            value={nuovaCategoria}
                            onChangeText={setNuovaCategoria}
                            autoFocus={true}
                        />

                        <View style={styles.buttonRow}>
                            <Button
                                title="Annulla"
                                onPress={() => {
                                    setNuovaCategoria("");
                                    setModalVisible(false);
                                }}
                                style={styles.secondaryButton}
                            />

                            <Button
                                title="Conferma"
                                onPress={handleAggiungiCategoria}
                                style={styles.primaryButton}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


export default AggiungiCategoriaButton;
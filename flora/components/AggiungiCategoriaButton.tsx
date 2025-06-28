import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import Button from "./Button";
import { insert, update } from "../database/CategorieDAO";

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
            // Inserisce una nuova categoria con pianta ID 0 (generica)
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
        <View>
            <Button
                title="Aggiungi Nuova Categoria"
                onPress={() => setModalVisible(true)}
            />

            {modalVisible && (
                <View>
                    <TextInput

                        placeholder="Nome della nuova categoria"
                        value={nuovaCategoria}
                        onChangeText={setNuovaCategoria}
                        autoFocus={true}
                    />

                    <View>
                        <Button
                            title="Annulla"
                            onPress={() => {
                                setNuovaCategoria("");
                                setModalVisible(false);
                            }}

                        />

                        <Button
                            title="Conferma"
                            onPress={handleAggiungiCategoria}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};



export default AggiungiCategoriaButton;
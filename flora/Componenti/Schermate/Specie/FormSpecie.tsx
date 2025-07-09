import React, { useState } from "react";
import { View, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Button from "../../Comuni/Input/Button";
import FotoPicker from "../../Comuni/Input/FotoPicker";
import { WikiPianta } from "../../../Model/WikiPianta";
import { styles } from "../../../Styles/FormSpecie";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import { MostraToast } from "../../Comuni/MessaggioToast";
import { isPortrait } from "../../Comuni/OrientazioneChecker";

export default function FormSpecie() {
    const [nome, setNome] = useState("");
    const [freqInnaff, setFreqInnaff] = useState("");
    const [freqPotat, setFreqPotat] = useState("");
    const [freqRinv, setFreqRinv] = useState("");
    const [foto, setFoto] = useState<any>(null);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const portrait = isPortrait();

    function isNumeroPositivo(val: string) {
        return /^\d+$/.test(val) && parseInt(val) > 0;
    }

    async function aggiungiSpecie() {
        if (!nome || !freqInnaff || !freqPotat || !freqRinv) {
            MostraToast({
                tipo: "error",
                titolo: "Errore",
                messaggio: "Tutti i campi sono obbligatori."
            });
            return;
        }
        if (
            !isNumeroPositivo(freqInnaff) ||
            !isNumeroPositivo(freqPotat) ||
            !isNumeroPositivo(freqRinv)
        ) {
            MostraToast({
                tipo: "error",
                titolo: "Errore",
                messaggio: "Inserisci numeri interi positivi nelle frequenze."
            });
            return;
        }
        await WikiPianta.creaNuova({
            specie: nome,
            freqInnaff: parseInt(freqInnaff),
            freqPotat: parseInt(freqPotat),
            freqRinv: parseInt(freqRinv),
            foto: foto?.uri ?? null
        });
        MostraToast({
            tipo: "success",
            titolo: "Specie aggiunta",
            messaggio: "Specie aggiunta correttamente."
        });
        navigation.navigate("Specie");
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={10}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
                <View style={portrait ? styles.formContainer : styles.formContainerLandscape}>
                    <View style={{ alignItems: "center", marginVertical: 12 }}>
                        <FotoPicker foto={foto} setFoto={setFoto} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome specie"
                        value={nome}
                        onChangeText={setNome}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Frequenza innaffiatura (giorni)"
                        value={freqInnaff}
                        onChangeText={setFreqInnaff}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Frequenza potatura (giorni)"
                        value={freqPotat}
                        onChangeText={setFreqPotat}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Frequenza rinvaso (giorni)"
                        value={freqRinv}
                        onChangeText={setFreqRinv}
                        keyboardType="numeric"
                    />
                    <View style={portrait ? styles.bottoniContainer : styles.bottoniContainerLandscape}>
                        <Button
                            testo="Aggiungi"
                            onPress={aggiungiSpecie}
                            stileButton={styles.bottoneAggiungi}
                            stileTesto={styles.testoBottone}
                        />
                        <Button
                            testo="Annulla"
                            onPress={() => navigation.goBack()}
                            stileButton={styles.bottoneAnnulla}
                            stileTesto={styles.testoBottone}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
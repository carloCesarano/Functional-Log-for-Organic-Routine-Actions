import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, TouchableOpacity, Alert } from "react-native";
import { WikiPianta } from "../../../Model/WikiPianta";
import * as WikiPianteDAO from "../../../Database/WikiPianteDAO";
import Button from "../../Comuni/Input/Button";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../../Styles/ListaSpecie";
import { MostraToast } from "../../Comuni/MessaggioToast";
import { isPortrait } from "../../Comuni/OrientazioneChecker";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../../../types';
import {StackNavigationProp} from "@react-navigation/stack";


export default function ListaSpecie() {
    const [specie, setSpecie] = useState<WikiPianta[]>([]);
    const [selezionate, setSelezionate] = useState<Set<number>>(new Set());
    const portrait = isPortrait();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        caricaSpecie();
    }, []);

    async function caricaSpecie() {
        const tutte = await WikiPianteDAO.getAll();
        tutte.sort((a, b) => a.getSpecie().localeCompare(b.getSpecie()));
        setSpecie(tutte);
    }

    function toggleSelezione(id: number) {
        setSelezionate(prev => {
            const nuovo = new Set(prev);
            if (nuovo.has(id)) nuovo.delete(id);
            else nuovo.add(id);
            return nuovo;
        });
    }

    async function eliminaSelezionate() {
        if (selezionate.size === 0) {
            MostraToast({
                tipo: "error",
                titolo: "Nessuna selezione",
                messaggio: "Seleziona almeno una specie da eliminare."
            });
            return;
        }

        const count = selezionate.size;
        Alert.alert(
            "Conferma eliminazione",
            `Vuoi davvero eliminare ${count === 1 ? "questa specie" : "queste specie"}? Tutte le piante possedute associate verranno eliminate.`,
            [
                {
                    text: "Annulla",
                    style: "cancel"
                },
                {
                    text: "Elimina",
                    style: "destructive",
                    onPress: async () => {
                        for (const id of selezionate) {
                            const wiki = specie.find(s => s.getId() === id);
                            if (wiki) await WikiPianteDAO.remove(wiki);
                        }
                        setSelezionate(new Set());
                        await caricaSpecie();
                        MostraToast({
                            tipo: "success",
                            titolo: "Eliminazione riuscita",
                            messaggio: count === 1
                                ? "Specie eliminata correttamente."
                                : "Specie eliminate correttamente."
                        });
                    }
                }
            ]
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={specie}
                    keyExtractor={item => item.getId().toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.card,
                                !portrait && styles.cardLandscape,
                                selezionate.has(item.getId()) && styles.cardSelezionata
                            ]}
                            onPress={() => toggleSelezione(item.getId())}
                        >

                            <View style={styles.info}>
                                <Text style={styles.nome}>{item.getSpecie()}</Text>
                                <Text style={styles.freq}>Innaffiatura: {item.getFreqInnaff()}g</Text>
                                <Text style={styles.freq}>Potatura: {item.getFreqPotat()}g</Text>
                                <Text style={styles.freq}>Rinvaso: {item.getFreqRinv()}g</Text>
                            </View>
                            <Image source={item.getFoto()} style={styles.foto} />
                            {selezionate.has(item.getId()) && (
                                <Ionicons name="checkmark-circle" size={28} color="green" />
                            )}
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={portrait ? styles.listaContent : styles.listaContentLandscape}
                />
            </View>
            <View style={portrait ? styles.bottoniContainer : styles.bottoniContainerLandscape}>
                <Button
                    testo="Elimina selezionate"
                    onPress={eliminaSelezionate}
                    stileButton={[styles.bottoneElimina, { opacity: selezionate.size === 0 ? 0.5 : 1 }]}
                    stileTesto={styles.testoBottone}
                />
                <Button
                    testo="Aggiungi specie"
                    onPress={() => navigation.navigate("AggiungiSpecie")}
                    stileButton={[
                        styles.bottoneAggiungi,
                        !portrait && { marginLeft: 40, marginVertical: 0 }
                    ]}
                    stileTesto={styles.testoBottone}
                />
            </View>
        </View>
    );
}
import React, {useEffect, useState} from "react";
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import * as DAO from "../database/PiantePosseduteDAO";
import {PiantaPosseduta} from "../model/PiantaPosseduta";
import Background from "../components/commons/Background";
import NavBar from "../components/navbar/NavBar";
import Button from "../components/inputs/Button";
import { styles } from "../styles/infoPianta";

type Props = NativeStackScreenProps<RootStackParamList, 'InfoPianta'>;

const formattaData = (data: Date | undefined) : string => {
    if (data === undefined)
        return "Sconosciuta"
    return data.toLocaleDateString('it-IT', {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

export default function InfoPianta({ navigation, route }: Props) {
    const { plantId } = route.params;

    const [isModifica,      setModifica       ] = useState<boolean>(false);
    const [piantaOriginale, setPiantaOriginale] = useState<PiantaPosseduta | null>(null);
    const [piantaAttuale,   setPiantaAttuale  ] = useState<PiantaPosseduta | null>(null)

    const [foto, setFoto] = useState<any>(null);

    useEffect(() => {
        const fetchPianta = async () => {
            const pianta = await DAO.get(plantId);
            setPiantaOriginale(pianta);
            setPiantaAttuale(pianta);
            setFoto(await pianta.getFoto());
        };
        fetchPianta();
    }, []);

    const handleEliminaPressed = () => {
        Alert.alert(
            "Conferma eliminazione",
            "Sei sicuro di voler eliminare questa pianta?",
            [
                {
                    text: "Annulla",
                    style: "cancel"
                },
                {
                    text: "Elimina",
                    onPress: () => handleElimina(),
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    const handleElimina = async () => {
        await DAO.remove(piantaOriginale as PiantaPosseduta);
        navigation.navigate("ListaPiante", { searched: '' });
    };

    return (
        <Background>
            <NavBar/>
            <ScrollView contentContainerStyle={[styles.scroll, {backgroundColor: piantaAttuale?.coloreStato()}]}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={styles.titolo}
                >{piantaAttuale?.getNome()}</Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={styles.specie}
                >{piantaAttuale?.getSpecie()}</Text>
                <Image
                    source={foto}
                    defaultSource={require("../assets/plantsMockup/generic.png")}
                    style={styles.image}
                />
                <View style={styles.infoBox}>
                    <Text>Data acquisizione: {formattaData(piantaAttuale?.getDataAcq())}</Text>
                    <Text>Categorie: {piantaAttuale?.getCategorie().join(", ")}</Text>
                    <Text>Ultima innaffiatura: {formattaData(piantaAttuale?.getUltimaInnaff())}</Text>
                    <Text>Ultima potatura: {formattaData(piantaAttuale?.getUltimaPotat())}</Text>
                    <Text>Ultimo rinvaso: {formattaData(piantaAttuale?.getUltimoRinv())}</Text>
                    <Text>Note: {piantaAttuale?.getNote()}</Text>
                </View>
            </ScrollView>
            <View style={styles.buttons}>
                <Button
                    title="Elimina"
                    buttonStyle={styles.eliminaButton}
                    onPress={handleEliminaPressed}
                />
                <Button
                    title="Modifica"
                    buttonStyle={styles.modificaButton}
                />
            </View>
        </Background>
    )
}
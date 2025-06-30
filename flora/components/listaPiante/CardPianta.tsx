import {PiantaPosseduta} from "../../model/PiantaPosseduta";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../types";
import React, {useEffect, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {listaPianteStyles as styles} from "../../styles/listaPiante";
import {LinearGradient} from "expo-linear-gradient";

export default function CardPianta({pianta}: {pianta: PiantaPosseduta}) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [foto, setFoto] = useState<any>(null);

    useEffect(() => {
        let attivo = true;
        const caricaFoto = async () => {
            if (attivo)
                setFoto(await pianta.getFoto());
        };
        caricaFoto();
        return () => {attivo = false};
    }, [pianta]);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('InfoPianta', {plantId: pianta.getId()})}
        >
            <LinearGradient
                colors={["white", pianta.coloreStato()]}
                start={{x: .25, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradient}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.nome}>{pianta.getNome()}</Text>
                    <Text style={styles.categoria}>{pianta.getSpecie()}</Text>
                    <Text style={styles.acquisizione}>Acquisita: {pianta.getDataAcq().toLocaleDateString()}</Text>
                </View>

                {foto ? (
                    <Image source={foto} style={styles.cardImage}/>
                ) : (
                    <View style={styles.cardImage}/>
                )}
            </LinearGradient>
        </TouchableOpacity>
    )
}
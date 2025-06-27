import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Button from "./Button";
import {PiantaPosseduta} from "../model/PiantaPosseduta";
import { prossimiInterventiStyles as styles } from "../styles/prossimiInterventi";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

interface Intervento {
    pianta: PiantaPosseduta;
    tipo: "innaffiatura" | "potatura" | "rinvaso";
    giorniRimanenti: number;
}

async function caricaInterventi(): Promise<Intervento[]> {
    const piante = await PiantaPosseduta.getAllPiante();
    const interventi: Intervento[] = [];

    for (const pianta of piante) {
        interventi.push({
            pianta,
            tipo: "innaffiatura",
            giorniRimanenti: pianta.giorniAllaProssimaInnaff(),
        });

        interventi.push({
            pianta,
            tipo: "potatura",
            giorniRimanenti: pianta.giorniAllaProssimaPotat(),
        });

        interventi.push({
            pianta,
            tipo: "rinvaso",
            giorniRimanenti: pianta.giorniAlProssimoRinv(),
        });
    }

    interventi.sort((a,b) => a.giorniRimanenti - b.giorniRimanenti);

    return interventi.filter(intervento => intervento.giorniRimanenti < 7);
}

export default function ProssimiInterventi({ navigation }: Props) {
    const [interventi, setInterventi] = useState<Intervento[]>([]);
    useEffect(() => {
        async function caricaDati() {
            const dati = await caricaInterventi();
            setInterventi(dati);
        }
        caricaDati();
    }, []);

    const setTitolo = (item: Intervento) : string => {
        const base = `${item.pianta.getNome()} - ${item.tipo}`
        const giorni = item.giorniRimanenti;
        if (giorni === 0)
            return `${base} (oggi)`;
        if (giorni === 1)
            return `${base} (tra 1 giorno)`;
        if (giorni > 1)
            return `${base} (tra ${giorni} giorni)`;
        if (giorni === -1)
            return `${base} (in ritardo di 1 giorno)`;
        return `${base} (in ritardo di ${-giorni} giorni)`;
    }

    const setColore = (giorni: number) => {
        if (giorni >= 0)
            return "#7bc53d"
        if (giorni <= -10)
            return "#d94949"
        return "#ece179"
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Prossimi interventi</Text>
            <View style={styles.container}>
                {interventi.map((item) => {
                    const titolo = setTitolo(item);
                    const colore = setColore(item.giorniRimanenti);
                    return (
                        <LinearGradient
                            key={`${item.pianta.getId()}-${item.tipo}`}
                            colors={["transparent", colore]}
                            style={styles.gradient}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                        >
                            <Button
                                title={titolo}
                                onPress={() => navigation.navigate("InfoPianta", {plantId: item.pianta.getId()})}
                                buttonStyle={styles.button}
                                textStyle={styles.cardText} />
                        </LinearGradient>
                    );
                })}
            </View>
        </View>
    );
}
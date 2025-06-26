import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types"; // importa il tuo tipo

import { prossimiInterventiStyles as styles } from "../styles/prossimiInterventi";
import {PiantaPosseduta} from "../model/PiantaPosseduta";

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

    return interventi;
    // return interventi.filter(intervento => intervento.giorniRimanenti < 7);
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
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Prossimi interventi</Text>
            <View style={styles.container}>
                {interventi.map((item) => {
                    // Costruiamo un titolo descrittivo
                    const titolo = `${item.pianta.getNome()} - ${item.tipo} (${item.giorniRimanenti} giorni)`;
                    const stile =
                        item.giorniRimanenti >= 0
                            ? styles.cardGood
                            : item.giorniRimanenti < -10
                                ? styles.cardBad
                                : styles.cardMeh;
                    // Un key unico, index va bene qui se nessun altro id disponibile
                    return (
                        <TouchableOpacity
                            key={`${item.pianta.getId()}_${item.tipo}`}
                            style={stile}
                            onPress={() =>
                                navigation.navigate("InfoPianta", { plantId: item.pianta.getId() })
                            }
                        >
                            <Text style={styles.cardText}>{titolo}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
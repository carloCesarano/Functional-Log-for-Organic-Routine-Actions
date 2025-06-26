import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types"; // importa il tuo tipo

import { prossimiInterventiStyles as styles } from "../styles/prossimiInterventi";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

type Intervento = {
    id: string;
    title: string;
    plantId: string;
};

const interventi: Intervento[] = [
    { id: "1", title: "Innaffiare - Ficus", plantId: "ficus123" },
    { id: "2", title: "Concimare - Aloe Vera", plantId: "aloe456" },
    { id: "3", title: "Potare - Bonsai", plantId: "bonsai789" },
    { id: "4", title: "Bruciare - Quercia", plantId: "qurcia901" },
    { id: "5", title: "Pisciare - Pino", plantId: "pino234" },
];

export default function ProssimiInterventi({ navigation }: Props) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Prossimi interventi</Text>
            <View style={styles.container}>
                {interventi.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate("InfoPianta", { plantId: item.plantId })
                        }
                    >
                        <Text style={styles.cardText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
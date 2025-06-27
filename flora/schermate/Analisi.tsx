import React from "react";
import {Text, View} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import {PiantaPosseduta} from "../model/PiantaPosseduta";

type Props = NativeStackScreenProps<RootStackParamList, 'Analisi'>;

export default function Analisi({ navigation }: Props) {
    const punteggio : () => Promise<number> = async () => {
        const allPiante : PiantaPosseduta[] = await PiantaPosseduta.getAllPiante();
        const stati     : number[] = [];

        for (const pianta of allPiante)
            stati.push(pianta.stato())
        return stati.reduce((a, b) => a + b) / stati.length;
    }

    const punteggioText : () => Promise<string> = async () => {
        return punteggio()
            .then(value => `${(value * 100).toPrecision(3)}%`)
    }

    return (
        <Background>
            <NavBar />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Analisi Piante</Text>

            {/* Contenuto della schermata Analisi */}
            <Text>
                Il tuo punteggio pollice verde è {punteggioText()}
            </Text>

            {/* Pulsante Indietro */}
            <Button
                title="Indietro"
                onPress={() => navigation.navigate('Home')}
            />
            </View>
        </Background>
    );
}
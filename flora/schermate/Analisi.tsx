import React from "react";
import {Text, View} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { globalStyles } from "../styles/global";

type Props = NativeStackScreenProps<RootStackParamList, 'Analisi'>;

export default function Analisi({ navigation }: Props) {
    return (
        <Background>
            <NavBar />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Analisi Piante</Text>

            {/* Contenuto della schermata Analisi */}
            <Text>
                Statistiche e dati analitici sulle tue piante...
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
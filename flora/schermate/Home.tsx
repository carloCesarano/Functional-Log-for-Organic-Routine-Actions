import React from "react";
import {View, Text, Button} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
    return (
        <View>
            <Text>Benvenuto nella Home</Text>
            <Button title="Nuova Pianta" onPress={() => navigation.navigate('AggiungiPianta')} />
            <Button title="Lista Piante" onPress={() => navigation.navigate('ListaPiante')} />
            <Button title="Info Pianta" onPress={() => navigation.navigate('InfoPianta', {plantId: '123'})} />
        </View>
    )
}
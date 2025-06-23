import React from "react";
import {View, Text, Button} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, 'AggiungiPianta'>;

export default function AggiungiPianta({ navigation }: Props) {
    return (
        <View>
            <Text>Benvenuto in AggiungiPianta</Text>
            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}
import React from "react";
import {View, Text, Button} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, 'ListaPiante'>;

export default function ListaPiante({ navigation }: Props) {
    return (
        <View>
            <Text>Benvenuto in ListaPiante</Text>
            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}
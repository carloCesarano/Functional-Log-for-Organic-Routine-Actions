import React from "react";
import {Text} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar"
import Button from "../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, 'ListaPiante'>;

export default function ListaPiante({ navigation, route }: Props) {
    const { searched } = route.params;

    return (
        <Background>
            <NavBar  />
            <Text>{searched}</Text>
            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
        </Background>
    )
}
import React from "react";
import {Text} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, 'InfoPianta'>;

export default function InfoPianta({ navigation, route }: Props) {
    const { plantId } = route.params;

    const handleBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Home');
        }
    };

    return (
        <Background>
            <NavBar />
            <Text>Benvenuto in InfoPianta</Text>
            <Text>ID Pianta: {plantId}</Text>
            <Button title="Indietro" onPress={handleBack} />
        </Background>
    );
}
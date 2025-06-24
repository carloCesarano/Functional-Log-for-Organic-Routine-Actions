import React from "react";
import {View, Text} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import {globalStyles} from "../styles/global";


type Props = NativeStackScreenProps<RootStackParamList, 'InfoPianta'>;

export default function InfoPianta({ navigation, route }: Props) {
    const { plantId } = route.params;

    return (
        <View style={globalStyles.background}>
            <NavBar />
            <Text>Benvenuto in InfoPianta</Text>
            <Text>ID Pianta: {plantId}</Text>
            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}
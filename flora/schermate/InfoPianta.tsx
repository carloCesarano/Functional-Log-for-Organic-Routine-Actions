import React from "react";
import {View, Text, Button} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import {globalStyles} from "../styles/global";

type Props = NativeStackScreenProps<RootStackParamList, 'InfoPianta'>;

export default function InfoPianta({ navigation, route }: Props) {
    const { plantId } = route.params;

    return (
        <View style={globalStyles.background}>
            <Text>Benvenuto in InfoPianta</Text>
            <Text>ID Pianta: {plantId}</Text>
            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}
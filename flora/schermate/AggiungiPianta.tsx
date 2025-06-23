import React from "react";
import {View, Text, Button} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import {globalStyles} from "../styles/global";
import NavBar from "../components/NavBar";

type Props = NativeStackScreenProps<RootStackParamList, 'AggiungiPianta'>;

export default function AggiungiPianta({ navigation }: Props) {
    return (
        <View style={globalStyles.background}>
            <Text>Benvenuto in AggiungiPianta</Text>
            <NavBar navigation={navigation} />
            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}
import React from "react";
import {View, Text} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import {globalStyles} from "../styles/global";

type Props = NativeStackScreenProps<RootStackParamList, 'AggiungiPianta'>;

export default function AggiungiPianta({ navigation }: Props) {
    return (
        <View style={globalStyles.background}>
            <NavBar navigation={navigation} />
            <Text>Benvenuto in AggiungiPianta</Text>
            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}
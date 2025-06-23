import React from "react";
import {View, Text} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import {globalStyles} from "../styles/global";
import Button from "../components/Button";
import NavBar from "../components/NavBar"

type Props = NativeStackScreenProps<RootStackParamList, 'ListaPiante'>;

export default function ListaPiante({ navigation, route }: Props) {
    const { searched } = route.params;

    return (
        <View style={globalStyles.background}>
            <Text>{searched}</Text>
            <NavBar navigation={navigation} />
            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}
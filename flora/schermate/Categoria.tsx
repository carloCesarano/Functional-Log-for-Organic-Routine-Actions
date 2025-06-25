import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, 'Categoria'>;

export default function Categoria({ navigation }: Props) {
    return (
        <Background>
            <NavBar />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Schermata Categorie</Text>
                <Button
                    title="Indietro"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </Background>
    );
}
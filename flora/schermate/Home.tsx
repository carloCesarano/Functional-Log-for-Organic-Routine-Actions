import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { globalStyles } from "../styles/global";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import AddButton from "../components/AddButton"; // ⬅️ importa il nuovo bottone

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
    return (
        <View style={globalStyles.background}>
            <NavBar navigation={navigation} />


            <Button title="Lista Piante" onPress={() => navigation.navigate('ListaPiante', { searched: '' })} />
            <Button title="Info Pianta" onPress={() => navigation.navigate('InfoPianta', { plantId: '123' })} />

            <AddButton />
        </View>
    );
}

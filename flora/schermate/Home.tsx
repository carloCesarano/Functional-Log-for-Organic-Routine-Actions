import React from "react";
import {Text, View} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import AggiungiPiantaButton from "../components/AggiungiPiantaButton";
import { globalStyles } from "../styles/global";
import HomeButton from "../components/HomeButton";
import ProssimiInterventi from "../components/ProssimiInterventi";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
    return (
        <View style={globalStyles.background}>
            <NavBar />

            <Text style={globalStyles.titolo}>Ultime piante aggiunte</Text>
            <HomeButton title="Vedi tutte le piante" onPress={() => navigation.navigate('ListaPiante', { searched: '' })} />
            <Button title="Info Pianta" onPress={() => navigation.navigate('InfoPianta', { plantId: '123' })} />
            <ProssimiInterventi navigation={navigation}/>
            <AggiungiPiantaButton />
        </View>
    );
}
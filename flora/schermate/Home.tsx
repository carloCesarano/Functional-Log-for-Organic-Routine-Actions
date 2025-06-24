import React from "react";
import {Text} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import AggiungiPiantaButton from "../components/AggiungiPiantaButton";
import HomeButton from "../components/HomeButton";
import ProssimiInterventi from "../components/ProssimiInterventi";
import { globalStyles } from "../styles/global";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
    return (
        <Background>
            <NavBar />

            {/* Sezione Lista Piante */}
            <Text style={globalStyles.titolo}>Ultime piante aggiunte</Text>
            <HomeButton title="Vedi tutte le piante" onPress={() => navigation.navigate('ListaPiante', { searched: '' })} />

            {/* Sezione Countdown Interventi  */}
            <ProssimiInterventi navigation={navigation}/>

            {/* Pulsante aggiungi pianta */}
            <AggiungiPiantaButton />
        </Background>
    );
}
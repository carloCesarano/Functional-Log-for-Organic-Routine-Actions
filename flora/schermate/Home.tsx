import React from "react";
import {View} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { globalStyles } from "../styles/global";
import NavBar from "../components/NavBar";
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


export default function Home({ navigation }: Props) {
    return (
        <View style={globalStyles.background}>
            <NavBar navigation={navigation} />
            <CustomButton title="Aggiungi Pianta" onPress={() => navigation.navigate('AggiungiPianta')}/>
            <CustomButton title="Lista Piante" onPress={() => navigation.navigate('ListaPiante', {searched: ''})} />
            <CustomButton title="Info Pianta" onPress={() => navigation.navigate('InfoPianta', {plantId: '123'})} />
        </View>
    )
}
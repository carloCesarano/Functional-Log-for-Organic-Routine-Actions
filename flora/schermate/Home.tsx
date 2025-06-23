import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { globalStyles } from "../styles/global";
import NavBar from "../components/NavBar";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


export default function Home({ navigation }: Props) {
    return (
        <View style={globalStyles.background}>
            <NavBar navigation={navigation} />
            <TouchableOpacity style={globalStyles.mainButton} onPress={() => navigation.navigate('AggiungiPianta')}>
                <Text style={globalStyles.mainButtonText}>Aggiungi Pianta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.mainButton} onPress={() => navigation.navigate('ListaPiante', {searched: ''})}>
                <Text style={globalStyles.mainButtonText}>Lista Piante</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.mainButton} onPress={() => navigation.navigate('InfoPianta', {plantId: '123'})}>
                <Text style={globalStyles.mainButtonText}>Info Pianta</Text>
            </TouchableOpacity>
        </View>
    )
}
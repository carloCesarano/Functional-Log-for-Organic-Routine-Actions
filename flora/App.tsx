import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToastMessage from "./components/commons/ToastMessage";
import { LogBox } from "react-native";
import {RootStackParamList} from "./types";
import Home from './schermate/Home';
import InfoPianta from './schermate/InfoPianta';
import AggiungiPianta from './schermate/AggiungiPianta';
import ListaPiante from "./schermate/ListaPiante";
import Impostazioni from "./schermate/Impostazioni";
import Analisi from './schermate/Analisi';
import Categorie from './schermate/Categorie';

// Definisce uno stack di pagine vuoto
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    LogBox.ignoreLogs(['Require cycle']);

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, title: "FLORA" }}>
                    {/* Aggiunge tutte le pagine dell'applicazione allo stack */}
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="InfoPianta" component={InfoPianta} />
                    <Stack.Screen name="AggiungiPianta" component={AggiungiPianta} />
                    <Stack.Screen name="ListaPiante" component={ListaPiante} />
                    <Stack.Screen name="Impostazioni" component={Impostazioni} />
                    <Stack.Screen name="Analisi" component={Analisi} />
                    <Stack.Screen name="Categorie" component={Categorie} />
                </Stack.Navigator>
            </NavigationContainer>
            <ToastMessage/>
        </>
    )
}
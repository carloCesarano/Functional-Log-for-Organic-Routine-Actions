import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {RootStackParamList} from "./types";
import Home from './schermate/Home';
import InfoPianta from './schermate/InfoPianta';
import AggiungiPianta from './schermate/AggiungiPianta';
import ListaPiante from "./schermate/ListaPiante";

// Definisce uno stack di pagine vuoto
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, title: "FLORA" }}>
                {/* Aggiunge tutte le pagine dell'applicazione allo stack */}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="InfoPianta" component={InfoPianta} />
                <Stack.Screen name="AggiungiPianta" component={AggiungiPianta} />
                <Stack.Screen name="ListaPiante" component={ListaPiante} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
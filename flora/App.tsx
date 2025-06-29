import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {RootStackParamList} from "./types";
import Home from './schermate/Home';
import InfoPianta from './schermate/InfoPianta';
import AggiungiPianta from './schermate/AggiungiPianta';
import ListaPiante from "./schermate/ListaPiante";
import Analisi from './schermate/Analisi';
import Categoria from './schermate/Categoria';

import DBTest from './schermate/test/DBTest';

// Definisce uno stack di pagine vuoto
const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, title: "FLORA" }}>
//                 {/* Aggiunge tutte le pagine dell'applicazione allo stack */}
//                 <Stack.Screen name="Home" component={Home} />
//                 <Stack.Screen name="InfoPianta" component={InfoPianta} />
//                 <Stack.Screen name="AggiungiPianta" component={AggiungiPianta} />
//                 <Stack.Screen name="ListaPiante" component={ListaPiante} />
//                 <Stack.Screen name="Analisi" component={Analisi} />
//                 <Stack.Screen name="Categoria" component={Categoria} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

export default function App() {
    // Test
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="DBTest" screenOptions={{ title: "TEST" }}>
                <Stack.Screen name="DBTest" component={DBTest} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
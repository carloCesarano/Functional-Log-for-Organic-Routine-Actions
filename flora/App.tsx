import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Require cycle']);

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import MessaggioToast from './Componenti/Comuni/MessaggioToast';

import Home           from './Schermate/Home';
import InfoPianta     from './Schermate/InfoPianta';
import AggiungiPianta from './Schermate/AggiungiPianta';
import ListaPiante    from './Schermate/ListaPiante';
import Impostazioni   from './Schermate/Impostazioni';
import Analisi        from './Schermate/Analisi';
import Categorie      from './Schermate/Categorie';
import Sviluppatore   from './Schermate/Sviluppatore';

// Definisce uno stack di pagine vuoto
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
                    {/* Aggiunge tutte le pagine dell'applicazione allo stack */}
                    <Stack.Screen name='Home'           component={Home}          />
                    <Stack.Screen name='InfoPianta'     component={InfoPianta}    />
                    <Stack.Screen name='AggiungiPianta' component={AggiungiPianta}/>
                    <Stack.Screen name='ListaPiante'    component={ListaPiante}   />
                    <Stack.Screen name='Impostazioni'   component={Impostazioni}  />
                    <Stack.Screen name='Analisi'        component={Analisi}       />
                    <Stack.Screen name='Categorie'      component={Categorie}     />
                    <Stack.Screen name='Sviluppatore'   component={Sviluppatore}  />
                </Stack.Navigator>
            </NavigationContainer>
            {/* Aggiunge la logica dei messaggi toast a tutte le schermate */}
            <MessaggioToast/>
        </>
    )
}
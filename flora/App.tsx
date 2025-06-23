import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './schermate/Home';
import InfoPianta from './schermate/InfoPianta';
import NuovaPianta from './schermate/NuovaPianta';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="InfoPianta" component={InfoPianta} />
                <Stack.Screen name="NuovaPianta" component={NuovaPianta} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
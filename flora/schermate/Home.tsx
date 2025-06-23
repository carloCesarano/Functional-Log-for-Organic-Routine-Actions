import React from "react";
import {View, Text, Button} from "react-native";

// @ts-ignore
export default function Home({ navigation }) {
    return (
        <View>
            <Text>Benvenuto nella Home</Text>
            <Button title="Nuova Pianta" onPress={() => navigation.navigate('NuovaPianta')} />
            <Button title="Info Pianta" onPress={() => navigation.navigate('InfoPianta')} />
        </View>
    )
}
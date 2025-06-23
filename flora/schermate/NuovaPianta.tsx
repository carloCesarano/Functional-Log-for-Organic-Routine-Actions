import React from "react";
import {View, Text, Button} from "react-native";

// @ts-ignore
export default function NuovaPianta({ navigation }) {
    return (
        <View>
            <Text>Benvenuto nel NuovaPianta</Text>
            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}
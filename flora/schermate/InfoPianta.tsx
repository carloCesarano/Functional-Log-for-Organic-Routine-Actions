import React from "react";
import {View, Text, Button} from "react-native";

// @ts-ignore
export default function InfoPianta({ navigation }) {
    return (
        <View>
            <Text>Benvenuto nell'InfoPianta</Text>
            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}
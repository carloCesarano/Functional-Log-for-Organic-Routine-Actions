import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {globalStyles} from "../styles/global";

interface Props {
    title: string,
    onPress?: () => void
}

export default function Button({title, onPress}: Props) {
    return (
        <TouchableOpacity style={globalStyles.mainButton} onPress={onPress}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <Text style={globalStyles.mainButtonText}>{title}</Text>
                <AntDesign name="arrowright" size={35} color="black"/>
            </View>
        </TouchableOpacity>
    )
}
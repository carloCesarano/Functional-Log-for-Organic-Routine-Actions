import {globalStyles} from "../styles/global";
import {Text, TouchableOpacity} from "react-native";
import React from "react";

interface CustomButtonProps {
    title?: string,
    onPress?: () => any
}

export default function Button ({title, onPress}: CustomButtonProps){
    return (
        <TouchableOpacity style={globalStyles.mainButton} onPress={onPress}>
            <Text style={globalStyles.mainButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}
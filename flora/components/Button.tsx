import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {globalStyles} from "../styles/global";

interface Props {
    title: string,
    onPress?: () => void
}

export default function Button ({title, onPress}: Props){
    return (
        <TouchableOpacity style={globalStyles.mainButton} onPress={onPress}>
            <Text style={globalStyles.mainButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}
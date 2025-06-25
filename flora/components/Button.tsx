import React from "react";
import {TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle} from "react-native";
import {globalStyles} from "../styles/global";

interface Props {
    title: string,
    onPress?: () => void,
    buttonStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
}

export default function Button ({title, onPress, buttonStyle, textStyle}: Props){
    return (
        <TouchableOpacity
            style={[globalStyles.mainButton, buttonStyle]}
            onPress={onPress}>
            <Text style={[globalStyles.mainButtonText, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
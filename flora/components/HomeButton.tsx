import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {AntDesign} from '@expo/vector-icons';
import {styles} from "../styles/home";

interface Props {
    title: string,
    onPress?: () => void
}

export default function Button({title, onPress}: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <LinearGradient
                colors={["transparent", "#6dd466"]}
                start={{x: 0, y: 0}}
                end={{x: 0.2, y: 1}}
                style={styles.gradient}>
                <Text style={styles.text}>{title}</Text>
                <AntDesign name="arrowright" size={35} color="black"/>
            </LinearGradient>
        </TouchableOpacity>
    )
}
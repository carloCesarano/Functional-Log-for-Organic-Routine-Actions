import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {RootStackParamList} from "../types";
import { globalStyles } from "../styles/global";
import {StackNavigationProp} from "@react-navigation/stack";

interface Props {
    style?: StyleProp<ViewStyle>; // Aggiungi questa linea
}

export default function AggiungiPiantaButton({style}:Props) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            style={globalStyles.addButton}
            onPress={() => navigation.navigate('AggiungiPianta')}
        >
            <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
    );
}



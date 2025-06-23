import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { globalStyles } from "../styles/global";


type RootStackParamList = {
    AggiungiPianta: undefined;
};

export default function AddButton() {
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



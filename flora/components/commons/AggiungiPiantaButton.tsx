import React from 'react';
import { RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from "../../styles/global";



export default function AggiungiPiantaButton() {
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



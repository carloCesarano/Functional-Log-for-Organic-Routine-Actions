import React from 'react';
import { RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from "../../styles/global";

type Props = {
    onPress: () => void;
};


export default function AggiungiPiantaButton({ onPress }: Props) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            style={globalStyles.addButton}
            onPress={onPress}
        >
            <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
    );
}



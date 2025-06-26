import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { navbarStyles } from "../styles/navbar";
import { useRoute } from "@react-navigation/native";

type Props = {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: (text: string) => void;
    placeholder?: string;
};

export default function SearchBox({ value, onChangeText, onSubmit, placeholder = "Cerca" }: Props) {
    const handleSubmit = () => {
        onSubmit(value);
    };
    const route = useRoute();
    const handleClear = () => {
        onChangeText("");
        if (route.name === "ListaPiante") {
            onSubmit("");
        }
    };

    return (
        <View style={navbarStyles.searchBox}>
            <TextInput
                style={navbarStyles.searchBoxText}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={handleSubmit}
                placeholder={placeholder}
                placeholderTextColor={"#767676"}
                returnKeyType={"search"}
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={navbarStyles.clearButton}>
                    <Text style={navbarStyles.clearButtonText}>X</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
import React from 'react';
import { View, TextInput } from 'react-native';
import { navbarStyles } from "../styles/navbar";

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
        </View>
    );
}

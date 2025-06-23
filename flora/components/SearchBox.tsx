import React, {useState} from 'react';
import {View, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData} from "react-native";
import {globalStyles} from "../styles/global";

type SearchBoxProps = {
    onSubmit: (text: string) => void;
    placeholder?: string;
};

export default function SearchBox({onSubmit, placeholder = "Cerca..."}: SearchBoxProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const text = e.nativeEvent.text;
        console.log("Testo cercato: ", text);
        onSubmit(text);
    };

    return (
        <View style={globalStyles.searchBox}>
            <TextInput
                style={globalStyles.searchBoxText}
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSubmit}
                placeholder={placeholder}
                placeholderTextColor={"#eaeaea"}
                returnKeyType={"search"}
            />
        </View>
    );
}
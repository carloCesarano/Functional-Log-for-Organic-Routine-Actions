import React, {useState} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {globalStyles} from "../styles/global";

type SearchBoxProps = {
    onSubmit: (text: string) => void;
    placeholder?: string;
    onMenuPress?: () => void;
};

export default function SearchBox({onSubmit, placeholder = "Cerca", onMenuPress}: SearchBoxProps) {
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
            <TouchableOpacity onPress={onMenuPress} style={{ paddingHorizontal: 10 }}>
                <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>

        </View>
    );
}
import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {navbarStyles} from "../styles/navbar";

type Props = {
    onSubmit: (text: string) => void;
    placeholder?: string;
};

export default function SearchBox({onSubmit, placeholder = "Cerca"}: Props) {

    // Recupera il testo digitato dall'utente
    const [query, setQuery] = useState('');

    // Funzione chiamata quando l'utente invia la ricerca
    const handleSubmit = () => {
        console.log("Testo cercato: ", query);
        onSubmit(query);
    };

    return (
        <View style={navbarStyles.searchBox}>
            <TextInput
                style={navbarStyles.searchBoxText}
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSubmit}
                placeholder={placeholder}
                placeholderTextColor={"#767676"}
                returnKeyType={"search"}
            />
        </View>
    );
}
import React from "react";
import {Image, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../types";
import SearchBox from "./SearchBox";
import {navbarStyles} from "../styles/navbar";

export default function NavBar() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // Metodo chiamato quando si effettua una ricerca nella SearchBox
    const handleSearch = (text: string) => {
        navigation.navigate('ListaPiante', {searched: text});
    };

    return (
        <View style={navbarStyles.navbar}>
            <Image style={navbarStyles.icon} source={require('../assets/full_logo.png')} />
            <SearchBox onSubmit={handleSearch}/>

        </View>
    );
}
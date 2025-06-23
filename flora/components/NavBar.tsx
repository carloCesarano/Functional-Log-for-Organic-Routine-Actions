import {globalStyles} from "../styles/global";
import {Image, View} from "react-native";
import SearchBox from "./SearchBox";
import React from "react";

// @ts-ignore
export default function NavBar({navigation}) {
    const handleSearch = (text: string) => {
        navigation.navigate('ListaPiante', {searched: text});
    };

    return (
        <View style={globalStyles.hbox}>
            <Image style={globalStyles.icon} source={require('../assets/full_logo.png')} />
            <SearchBox onSubmit={handleSearch}/>
        </View>
    );
}
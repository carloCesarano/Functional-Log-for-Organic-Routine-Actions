import React, {useEffect, useState} from "react";
import {Image, TouchableOpacity, View} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import SearchBox from "./SearchBox";
import { navbarStyles } from "../styles/navbar";
import HamburgerMenu from "./HamburgerMenu";
import { globalStyles, isMobile } from "../styles/global";

export default function NavBar() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const [searchText, setSearchText] = useState("");

    // Metodo chiamato quando si effettua una ricerca nella SearchBox
    useEffect(() => {
        const paramSearch = (route.params as any)?.searched || "";
        setSearchText(paramSearch);
    }, [route]);

    const handleSearch = (text: string) => {
        setSearchText(text);
        if (route.name === "ListaPiante") {
            navigation.setParams({ searched: text });
        } else {
            navigation.navigate("ListaPiante", { searched: text });
        }
    };


    // Gestione selezione voci menu
    const handleMenuItemSelect = (item: string) => {
        switch (item) {
            case "Analisi":
                navigation.navigate("Analisi");
                break;
            case "Categoria":
                navigation.navigate("Categoria");
                break;
            case "Impostazioni":
                console.log("Impostazioni cliccato");
                break;
            default:
                console.log("Voce menu non gestita:", item);
        }
    };

    const navigateHome = () => navigation.navigate("Home");

    return (
        <View style={navbarStyles.navbar}>
            <TouchableOpacity
                onPress={navigateHome}>
                <Image style={navbarStyles.icon} source={require("../assets/full_logo.png")} />
            </TouchableOpacity>
            {isMobile ? (
                <>
                    <SearchBox
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmit={handleSearch}
                        placeholder="Cerca"
                    />
                    <HamburgerMenu
                        menuItems={["Impostazioni", "Analisi", "Categoria"]}
                        onItemSelect={handleMenuItemSelect}
                    />
                </>
            ) : (
                <View style={globalStyles.hbox}>
                    <SearchBox
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmit={handleSearch}
                        placeholder="Cerca"
                    />
                    <HamburgerMenu
                        menuItems={["Impostazioni", "Analisi", "Categoria"]}
                        onItemSelect={handleMenuItemSelect}
                    />
                </View>
            )}
        </View>
    );
}
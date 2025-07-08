import React from "react";
import NavBar from "../Componenti/Comuni/NavBar";
import Background from "../Componenti/Comuni/Background";
import ListaSpecie from "../Componenti/Schermate/Specie/ListaSpecie";
import Titolo from "../Componenti/Comuni/Titolo";
import {View} from "react-native";

export default function Specie() {
    return (
        <Background>
            <NavBar />
            <View style={{ width: "100%", alignItems: "flex-start" }}>
                <Titolo nome="Specie" />
            </View>
            <ListaSpecie />
        </Background>
    );
}
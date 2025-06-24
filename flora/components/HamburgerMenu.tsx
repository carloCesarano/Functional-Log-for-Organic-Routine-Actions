import React from "react";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {navbarStyles} from "../styles/navbar";

export default function HamburgerMenu() {
    return (
        <TouchableOpacity>
            <Ionicons name="menu" size={24} style={navbarStyles.hamburgerMenu} />
        </TouchableOpacity>
    )
}
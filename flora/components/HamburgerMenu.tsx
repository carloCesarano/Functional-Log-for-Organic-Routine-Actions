import React from "react";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {navbarStyles} from "../styles/navbar";

export default function HamburgerMenu() {
    return (
        <TouchableOpacity style={navbarStyles.hamburgerMenu}>
            <Ionicons name="menu" size={32} style={navbarStyles.hamburgerMenuIcon} />
        </TouchableOpacity>
    )
}
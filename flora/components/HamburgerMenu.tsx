import React from "react";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {navbarStyles, isMobile} from "../styles/navbar";

export default function HamburgerMenu() {
    return (
        <TouchableOpacity style={navbarStyles.hamburgerMenu}>
            <Ionicons name="menu" size={isMobile ? 32 : 48} style={navbarStyles.hamburgerMenuIcon} />
        </TouchableOpacity>
    )
}
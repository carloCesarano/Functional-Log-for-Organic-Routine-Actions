import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { navbarStyles, isMobile } from "../styles/navbar";

export interface HamburgerProps {
    menuItems: string[]; // Array di voci di menu
    onItemSelect: (item: string) => void; // Callback quando si seleziona una voce
}

export default function HamburgerMenu(props: HamburgerProps) {
    const { menuItems, onItemSelect } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={navbarStyles.hamburgerContainer}>
            {/* Pulsante hamburger */}
            <TouchableOpacity onPress={toggleMenu} style={navbarStyles.hamburgerButton}>
                <Ionicons
                    name="menu"
                    size={isMobile ? 32 : 48}
                    style={navbarStyles.hamburgerIcon}
                />
            </TouchableOpacity>

            {/* Menu a tendina (visibile solo quando isOpen è true) */}
            {isOpen && (
                <View style={navbarStyles.menuDropdown}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => {
                                onItemSelect(item);
                                setIsOpen(false); // Chiudi il menu dopo la selezione
                            }}
                            style={navbarStyles.menuItem}
                        >
                            <Text style={navbarStyles.menuItemText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}
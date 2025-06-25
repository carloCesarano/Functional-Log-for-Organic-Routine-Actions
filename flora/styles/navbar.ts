import { StyleSheet, Platform } from "react-native";

export const isMobile = Platform.OS === "android" || Platform.OS === "ios";

export const navbarStyles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    icon: {
        width: isMobile ? 50 : 150,
        height: isMobile ? 50 : 150,
    },
    searchBox: {
        flexDirection: 'row',
        backgroundColor: '#dcf2d5',
        alignItems: 'center',
        height: isMobile ? 40 : 60,
        width: 240,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#185730',
        borderStyle: 'solid',
        paddingHorizontal: 10,
    },
    searchBoxText: {
        height: isMobile ? 40 : 60,
        width: 200,
        borderRadius: 50,
        fontSize: isMobile ? 16 : 32,
        paddingHorizontal: 10,
        color: 'black',
    },
    hamburgerMenu: {
        marginLeft: isMobile ? 0 : 20,
    },
    hamburgerMenuIcon: {
        color: "black",
    },

    hamburgerContainer: {
        position: 'relative',
    },
    hamburgerButton: {
        padding: 10,
    },
    hamburgerIcon: {
        color: '#000',
    },
    menuDropdown: {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 10,
        minWidth: 150,
        zIndex: 100,
    },
    menuItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
    },
});
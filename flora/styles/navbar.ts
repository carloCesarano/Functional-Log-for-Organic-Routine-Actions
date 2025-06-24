import { StyleSheet, Platform } from "react-native";

const isMobile = Platform.OS === "android" || Platform.OS === "ios";

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
    },
    hamburgerMenuIcon: {
        color: "black",
    },
});
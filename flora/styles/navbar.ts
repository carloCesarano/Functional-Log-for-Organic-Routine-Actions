import {StyleSheet} from "react-native";

export const navbarStyles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    icon: {
        width: 150,
        height: 150,
    },
    hamburgerMenu: {
        width: 50,
        height: 50,
        color: "black",
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: 240,
        backgroundColor: '#52b04e',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#0e4523',
        borderStyle: 'solid',
        paddingHorizontal: 10,
    },
    searchBoxText: {
        height: 60,
        width: 200,
        borderRadius: 50,
        fontSize: 32,
        paddingHorizontal: 10,
        color: '#fff',
    },
})
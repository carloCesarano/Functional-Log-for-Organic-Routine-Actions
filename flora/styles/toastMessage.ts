import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        top: 80,
        zIndex: 10000,
        elevation: 10000
    },
    content: {
        paddingHorizontal: 15
    },
    title: {
        fontSize: 18,
        fontWeight: '400'
    },
    text: {
        fontSize: 14
    }
})
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    button: {
        marginHorizontal: "7.5%",
        width: "85%",
        backgroundColor: 'transparent',
        borderRadius: 20,
        alignItems: "flex-start",
        marginVertical: 8,
    },
    gradient: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    text: {
        color: 'black',
        fontSize: 23,
        fontWeight: '500',
        fontStyle: "italic"
    },

    piantaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: 10,
    },

});
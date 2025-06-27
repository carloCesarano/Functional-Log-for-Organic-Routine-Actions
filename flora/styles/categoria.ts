import {StyleSheet, Platform, Dimensions} from "react-native";

export const isMobile: boolean = Platform.OS === "android" || Platform.OS === "ios";

export const categoriaStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titolo: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#008000',
    },
    carouselContainer: {
        height: 120,
        marginBottom: 20,
        borderRadius: 50,
    },
    infoContainer: {
        backgroundColor: '#52b04e',
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    testoInfo: {
        fontSize: 16,

    },
    categoriaText: {
        fontWeight: 'bold',
        color: '#008000',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    secondaryButton: {
        backgroundColor: '#2ecc71',
        marginVertical: 10,
    },
    backButton: {
        backgroundColor: '#7f8c8d',
        marginTop: 20,
    },
    innercontainer: {
        flex: 1,
        marginVertical: 20,
    },
    scrollContent: {
        paddingHorizontal: 10,
        alignItems: "center",
    },
    item: {
        backgroundColor: "#f0f0f0",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: Dimensions.get("window").width * 0.3,
        marginHorizontal: 5,
    },
    selectedItem: {
        backgroundColor: "#d4e6f1",
        borderWidth: 2,
        borderColor: "#3498db",
    },
    itemText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5,
    },
    countText: {
        fontSize: 12,
        color: "#666",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
    },
})
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1e3d00',
    },
    box: {
        backgroundColor: '#a6e3a1',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
    },
    chartBox: {
        backgroundColor: '#a6e3a1',
        borderRadius: 20,
        paddingVertical: 20,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
        overflow: 'hidden',
    },
    boxText: {
        fontSize: 16,
        color: '#1e3d00',
        textAlign: 'center',
        marginVertical: 2,
    },
    score: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 10,
        color: '#2f4f1d',
    },  
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 24,
        width: '100%',
    },
    backButton: {
        backgroundColor: "#7DBB8D",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignSelf: 'center',
        width: '60%',
    },
    backText: {
        color: "#2E4A2C",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    chartStyle: {
        marginVertical: 10,
        borderRadius: 16,
        alignSelf: 'center',
    },
    activityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    activityItem: {
        alignItems: 'center',
    },
    activityValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e3d00',
    },
    activityLabel: {
        fontSize: 14,
        color: '#2f4f1d',
        marginTop: 5,
    },
});

export default styles;
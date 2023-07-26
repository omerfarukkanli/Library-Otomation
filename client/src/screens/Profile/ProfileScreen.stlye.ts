import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    innerContainer: {
        width: "100%",
        alignItems: "center"
    },
    userContainer: {
        width: "100%",
        alignItems: "center"
    },
    userDetail: {
        margin: 10
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "tomato",
        padding: 10,
        borderRadius: 10,
        width: "30%"
    },
    buttonText: { color: "white", fontWeight: "bold" }
})
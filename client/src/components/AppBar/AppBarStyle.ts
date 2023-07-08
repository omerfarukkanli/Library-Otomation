import { StyleSheet } from "react-native";

export default StyleSheet.create({
    AppBar: {
        position: "absolute",
        height: 80,
        borderBottomWidth: 2,
        borderColor: "tomato",
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    Text: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 40,
        marginTop: 20,
        color: "tomato",

    },
    Button: {
        marginRight: 40,
        marginTop: 20,
        paddingBottom: 3,
        borderBottomWidth: 2,
        borderColor: "tomato",
    },
    ButtonText: {
        color: "tomato",
        fontWeight: "600"
    }

})
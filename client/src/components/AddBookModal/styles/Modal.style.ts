import { StyleSheet, Dimensions } from "react-native";
const dviceSize = Dimensions.get("window")
export default StyleSheet.create({
    modalContainer: {
        margin: 0,
        justifyContent: "flex-end"
    },
    innerContainer: {
        padding: 20,
        alignItems: "center",
        margin: 0,
        backgroundColor: "white",
        height: dviceSize.height / 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    textCOntainer: {
        alignItems: "flex-start",
        width: "100%"
    },
    authorsContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    authorsAddButton: {
        backgroundColor: "tomato",
        marginBottom: 10,
        marginLeft: 10,
        height: 45,
        width: "27%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    authorsAddButtonText: {
        color: "white",
    },
    authorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    authorText: {
        fontSize: 10,
        marginRight: 5,
    },
    removeIcon: {
        color: 'red',
        fontWeight: 'bold',
    },
    authorsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    imageButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        marginBottom: 10,
    },
    base64Text: {
        marginBottom: 10,
    },
    clearButton: {
        backgroundColor: 'red',
        padding: 10,
    },
    checkmark: {
        backgroundColor: 'green',
        borderRadius: 100,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
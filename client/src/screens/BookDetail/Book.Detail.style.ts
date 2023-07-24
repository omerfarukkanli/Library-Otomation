import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    innerContainer: {
        padding: 20,
        marginBottom: 50,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    bookContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    textContainer: {
        width: "100%",
        alignItems: "center"
    },
    bookContainerText: {
        color: "tomato",
        fontWeight: "bold",
        width: "20%",
        marginBottom: 10
    },
    authorContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonStyle: {
        padding: 5,
        borderRadius: 7,
        width: 100,
        backgroundColor: "tomato",
        marginLeft: 10,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonTextStyle: {
        fontWeight: "bold",
        color: "white"
    },
    image: {
        width: 200,
        height: 300,
        marginBottom: 20
    },
    authorText: {
        color: 'white',
        fontSize: 14,
        marginRight: 15,
    },
    removeIcon: {
        color: 'red',
        fontWeight: 'bold',
    },
    authorsList: {
        height: 100,
        marginBottom: 10,
        width: "100%",
        flexDirection: 'row',
        alignItems: "flex-start"
    },
    authorItem: {
        marginBottom:5,
        height: 30,
        justifyContent: "space-between",
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "tomato",
    },
    authorsAddButtonText: {
        color: "white",
    },
    authorsAddButton: {
        marginLeft: "5%",
        width: "20%",
        backgroundColor: "tomato",
        marginBottom: 10,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },

})
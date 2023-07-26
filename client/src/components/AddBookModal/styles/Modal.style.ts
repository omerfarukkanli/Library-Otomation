import { StyleSheet, Dimensions } from "react-native";
const dviceSize = Dimensions.get("window")
export default StyleSheet.create({
    modalContainer: {
        margin: 0,
        justifyContent: "flex-end"
    },
    innerContainer: {
        marginTop:40,
        padding: 20,
        alignItems: "center",
        backgroundColor: "white",
        height: dviceSize.height / 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    textContainer: {
        marginTop:20,
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
        marginBottom: 5,
        height: 30,
        justifyContent: "space-between",
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "tomato",
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
        height: 70,
        width: "100%",
        flexDirection: 'row',
        alignItems: "flex-start"
    },
    bookContainerText: {
        color: "tomato",
        fontWeight: "bold",
        width: "20%",
        marginBottom: 10
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
      
})
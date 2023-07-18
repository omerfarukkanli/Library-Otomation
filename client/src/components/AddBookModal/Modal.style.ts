import { StyleSheet, Dimensions } from "react-native";
const dviceSize = Dimensions.get("window")
export default StyleSheet.create({
    modalContainer: {
        margin: 0,
        justifyContent: "flex-end"
    },
    innerContainer: {
        paddingTop: 20,
        alignItems: "center",
        margin: 0,
        backgroundColor: "white",
        height: dviceSize.height / 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }

})
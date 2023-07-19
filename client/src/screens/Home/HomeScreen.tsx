import { View } from "react-native"
import React, { useState } from "react"
import AddBookModal from "../../components/AddBookModal/AddBookModal"
import AddBookButton from "../../components/AddBookModal/AddBookButton"
const HomeScreen = () => {
    const [isVisible, setİsVisiable] = useState<boolean>(false)

    const handlePress = () => {
        setİsVisiable(!isVisible)
    }
    return (
        <View>
            <AddBookModal isVisible={isVisible} onClose={handlePress} />
            <AddBookButton onPress={handlePress} />
        </View>
    )
}

export default HomeScreen
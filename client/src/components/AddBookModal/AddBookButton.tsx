import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from "./Button.style"

interface IProps {
    onPress: () => void
}
const AddBookButton: React.FC<IProps> = ({ onPress }) => {
    return (

        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.icon}>+</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AddBookButton
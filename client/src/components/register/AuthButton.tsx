import { FC } from "react"
import { Pressable, Text } from "react-native"
import styles from "./AuthButton.style"
import { Colors } from "react-native/Libraries/NewAppScreen"

interface Iprops {
    title: string,
    handlePressButton: () => void

}

const AuthButton: FC<Iprops> = ({ title, handlePressButton }) => {
    return (
        <Pressable style={styles.Button} onPress={handlePressButton}><Text style={styles.ButtonText}>{title}</Text></Pressable>
    )
}

export default AuthButton
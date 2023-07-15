import { FC, memo } from "react"
import { Text, TouchableOpacity } from "react-native"
import styles from "./AuthButton.style"


interface Iprops {
    title: string,
    handlePressButton: () => void

}

const AuthButton: FC<Iprops> = ({ title, handlePressButton }) => {
    return (
        <TouchableOpacity style={styles.Button} onPress={handlePressButton}><Text style={styles.ButtonText}>{title}</Text></TouchableOpacity>
    )
}

export default AuthButton
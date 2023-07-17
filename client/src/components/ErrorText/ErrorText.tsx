import { Text } from 'react-native'
import React from 'react'
import styles from "./ErrorText.style"
interface IProp {
    text: string | undefined;
}
const ErrorText: React.FC<IProp> = ({ text }) => {
    return (
        <>
            <Text style={styles.errorMessage}>{text}</Text>
        </>
    )
}

export default ErrorText
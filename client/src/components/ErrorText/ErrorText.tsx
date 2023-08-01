import { Text } from 'react-native'
import React from 'react'
import styles from "./ErrorText.style"
interface IProp {
    text: string | undefined;
    top: number
}
const ErrorText: React.FC<IProp> = ({ text, top }) => {
    return (
        <>
            <Text style={[styles.errorMessage, { top: top }]}>{text}</Text>
        </>
    )
}

export default ErrorText
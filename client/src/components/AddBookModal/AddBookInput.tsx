import { View, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from "./styles/Input.style"
interface IProps {
    placeholder: string
    onChangeText: (text: string) => void
    value: string
    width?: string
}
const AddBookInput: React.FC<IProps> = ({ placeholder, onChangeText, value, width="100%"}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput style={[styles.input, isFocused && styles.ınputStyleFocused, { width: width }]}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            value={value} />
    )
}

export default AddBookInput
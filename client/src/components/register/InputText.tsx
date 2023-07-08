import { TextInput } from "react-native"
import styles from "../register/InputText.style"
import React, { FC, useState } from "react"


interface Iprops {
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    placeholder: string,
    secureText?: boolean
}


const InputText: FC<Iprops> = ({ placeholder, secureText = false, keyboardType }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput style={[styles.textInputStyle, isFocused && styles.ınputStyleFocused]} onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)} placeholder={placeholder} secureTextEntry={secureText} keyboardType={keyboardType} />
    )
}



export default InputText;
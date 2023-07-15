import { TextInput } from "react-native"
import styles from "../register/InputText.style"
import React, { FC, useState } from "react"


interface Iprops {
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    placeholder: string;
    secureText?: boolean;
    value: string;
    onChangeText: (text: string) => void;

}


const InputText: FC<Iprops> = ({ placeholder, secureText = false, keyboardType, value, onChangeText }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput style={[styles.textInputStyle, isFocused && styles.ınputStyleFocused]} onFocus={() => setIsFocused(true)} value={value}
            onBlur={() => setIsFocused(false)} placeholder={placeholder} secureTextEntry={secureText} keyboardType={keyboardType} onChangeText={onChangeText} />
    )
}



export default React.memo(InputText)
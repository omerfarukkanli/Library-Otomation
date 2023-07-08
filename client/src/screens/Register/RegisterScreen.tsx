import { View, Text } from "react-native"
import InputText from "../../components/register/InputText"
import AuthButton from "../../components/register/AuthButton"
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../types'
import styles from "./RegisterScreen.style"
import { useState } from "react";



const RegisterScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [name, setName] = useState('')
    const [surname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <View style={styles.container}>
            <Text style={styles.text}> LİBRARY</Text>
            <InputText placeholder="Ad" />
            <InputText placeholder="Soyad" />
            <InputText placeholder="E-mail" keyboardType='email-address' />
            <InputText placeholder="şifre" secureText={true} />
            <AuthButton title="Kayıt Ol" handlePressButton={() => navigation.navigate("Home")} />
            <View style={styles.textController}>
                <Text>Giriş yapmak için </Text>
                <Text style={{ color: "tomato" }} onPress={() => navigation.navigate("Login")}>Tıklayınız</Text>
            </View>
        </View>
    )
}

export default RegisterScreen
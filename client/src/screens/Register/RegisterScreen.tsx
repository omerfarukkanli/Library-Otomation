import { View, Text } from "react-native"
import InputText from "../../components/register/InputText"
import AuthButton from "../../components/register/AuthButton"
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../types'
import styles from "./RegisterScreen.style"
import { useState } from "react";
import { IUser } from "../../api/user.api";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/userSlice";



const RegisterScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<any>()
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlePressButton = async () => {
        try {
            const userData: IUser = {
                name: name,
                lastname: lastname,
                email: email,
                password: password
            }
            console.log(userData)
            dispatch(addUser(userData))
            
            if (userData != null) navigation.navigate("Home")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}> LİBRARY</Text>
            <InputText placeholder="Ad" value={name} onChangeText={setName} />
            <InputText placeholder="Soyad" value={lastname} onChangeText={setLastName} />
            <InputText placeholder="E-mail" keyboardType='email-address' value={email} onChangeText={setEmail}/>
            <InputText placeholder="şifre" secureText={true} value={password}onChangeText={setPassword} />
            <AuthButton title="Kayıt Ol" handlePressButton={handlePressButton} />
            <View style={styles.textController}>
                <Text>Giriş yapmak için </Text>
                <Text style={{ color: "tomato" }} onPress={handlePressButton}>Tıklayınız</Text>
            </View>
        </View>
    )
}

export default RegisterScreen
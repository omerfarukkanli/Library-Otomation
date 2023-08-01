import { View, Text } from "react-native"
import InputText from "../../components/register/InputText"
import AuthButton from "../../components/register/AuthButton"
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../types'
import styles from "./RegisterScreen.style"
import { useEffect, useState } from "react";
import { IUser } from "../../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { addUser, clearError, clearUser } from "../../features/userSlice";
import { AppDispatch, RootState } from "../../store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import ErrorText from "../../components/ErrorText/ErrorText";

const RegisterScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch<AppDispatch>()
    const selectError = useSelector((state: RootState) => state.userReducer.error);

    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    name.trim()
    lastname.trim()
    email.trim()
    password.trim()

    const handlePressButton = async () => {
        const userData: IUser = {
            name: name,
            lastname: lastname,
            email: email,
            password: password
        }
        const user = await dispatch(addUser(userData));
        if (user.meta.requestStatus === "fulfilled") {
            navigation.navigate('Home');
            setName('');
            setLastName('');
            setEmail('');
            setPassword('')
        }
        else dispatch(clearUser())
    }
    return (
        <View style={styles.container}>
            <View style={{ position: "relative" }}>
                <Text style={styles.text}> LİBRARY</Text>
                <ErrorText top={10} text={selectError} />
            </View>
            <InputText placeholder="Ad" value={name} onChangeText={setName} />
            <InputText placeholder="Soyad" value={lastname} onChangeText={setLastName} />
            <InputText placeholder="E-mail" keyboardType='email-address' value={email} onChangeText={setEmail} />
            <InputText placeholder="şifre" secureText={true} value={password} onChangeText={setPassword} />
            <AuthButton title="Kayıt Ol" handlePressButton={handlePressButton} />
            <View style={styles.textController}>
                <Text>Giriş yapmak için </Text>
                <Text style={{ color: "tomato" }} onPress={() => navigation.navigate("Login")}>Tıklayınız</Text>
            </View>
        </View>
    )
}

export default RegisterScreen
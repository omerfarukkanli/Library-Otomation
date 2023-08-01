import { View, Text } from "react-native"
import InputText from "../../components/register/InputText"
import styles from "../Register/RegisterScreen.style"
import AuthButton from "../../components/register/AuthButton"
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../types'
import { useState } from "react";
import { clearError, clearUser, loginUser } from "../../features/userSlice";
import { IUserRes } from "../../api/user.api";
import { AppDispatch, RootState } from "../../store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ErrorText from "../../components/ErrorText/ErrorText";

const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch<AppDispatch>()
    const selectError = useSelector((state: RootState) => state.userReducer.error);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    email.trim()
    password.trim()

    const handlePressButton = async () => {
        email.trim();
        password.trim();
        const userData: IUserRes = {
            email: email,
            password: password
        }
        const user = await dispatch(loginUser(userData));
        if (user.meta.requestStatus === "fulfilled") {
            navigation.navigate('Home');
            setEmail('');
            setPassword('')
            dispatch(clearError())
        }
        else dispatch(clearUser())
    }
    return (
        <View style={styles.container}>
            <View style={{ position: "relative" }}>
                <Text style={styles.text}> LİBRARY</Text>
                <ErrorText top={40} text={selectError} />
            </View>
            <InputText value={email} placeholder="E-mail" onChangeText={setEmail} keyboardType="email-address" />
            <InputText value={password} placeholder="şifre" secureText={true} onChangeText={setPassword} />
            <AuthButton title="Gİriş Yap" handlePressButton={handlePressButton} />
            <View style={styles.textController}>
                <Text>Kayıt olmak için </Text>
                <Text style={{ color: "tomato" }} onPress={() => {
                    dispatch(clearError())
                    navigation.navigate("Register")
                }}>Tıklayınız</Text>
            </View>
        </View >
    )
}

export default LoginScreen
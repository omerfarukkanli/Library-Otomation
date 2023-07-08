import { View, Text } from "react-native"
import InputText from "../../components/register/InputText"
import styles from "../Register/RegisterScreen.style"
import AuthButton from "../../components/register/AuthButton"
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../types'



const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <View style={styles.container}>
            <Text style={styles.text}> LİBRARY</Text>
            <InputText placeholder="Kullanıcı Adı" />
            <InputText placeholder="şifre" secureText={true} />
            <AuthButton title="Gİriş Yap" handlePressButton={() => navigation.navigate("Home")} />
            <View style={styles.textController}>
                <Text>Kayıt olmak için </Text>
                <Text style={{ color: "tomato" }} onPress={() => navigation.navigate("Register")}>Tıklayınız</Text>
            </View>
        </View >
    )
}

export default LoginScreen
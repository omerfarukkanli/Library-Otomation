import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import AuthButton from '../../components/register/AuthButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../types'


const ProfileScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const userData = useSelector((state: RootState) => state.userReducer.userState)
    if (userData) {
        return (
            <View>
                <Text>{userData!.email}</Text>
                <Text>{userData!.name}</Text>
                <Text>{userData!.lastname}</Text>
                <Text>{userData!.password}</Text>
                <AuthButton handlePressButton={() => { }} title='ÇIKIŞ YAP' />

            </View>
        )

    }
    return (
        <View>
            <AuthButton handlePressButton={() => { navigation.navigate("Login") }} title='GİRİŞ YAP' />
        </View>
    )
}

export default ProfileScreen
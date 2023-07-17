import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import AuthButton from '../../components/register/AuthButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../types'
import { clearUser } from '../../features/userSlice'



const ProfileScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const userData = useSelector((state: RootState) => state.userReducer.userState)
    const dispatch = useDispatch()


    const handleLogOut = () => {
        dispatch(clearUser());
        navigation.navigate("Login");
    }
    return (
        <View>
            {userData ? (
        <View>
          <Text>{userData.username}</Text>
          <Text>{userData.email}</Text>
          <AuthButton handlePressButton={handleLogOut} title='ÇIKIŞ YAP' />
        </View>
      ) : (
        <AuthButton handlePressButton={() => navigation.navigate("Login")} title='GİRİŞ YAP' />
      )}
        </View>
    )
}

export default ProfileScreen
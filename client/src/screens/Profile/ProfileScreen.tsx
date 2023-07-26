import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import AuthButton from '../../components/register/AuthButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../types'
import { clearUser } from '../../features/userSlice'
import styles from "./ProfileScreen.stlye"


const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const userData = useSelector((state: RootState) => state.userReducer.userState)
  const dispatch = useDispatch()


  const handleLogOut = () => {
    navigation.navigate("Login");
    dispatch(clearUser());
  }
  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.userContainer}>
          <View style={styles.userDetail}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Kullanıcı Adı:</Text> {userData.username}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Email:</Text> {userData.email}
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>ÇIKIŞ YAP</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
            <Text style={styles.buttonText}>GİRİŞ YAP</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default ProfileScreen
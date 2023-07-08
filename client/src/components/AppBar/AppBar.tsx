import { View, Text, Pressable } from "react-native"
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../types'

import styles from "./AppBarStyle"

const AppBar = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (

        <View style={styles.AppBar}>
            <Text style={styles.Text}>LİBRARY</Text>
            <Pressable onPress={() => { navigation.navigate("Login") }} style={styles.Button}><Text style={styles.ButtonText}>Giriş Yap</Text></Pressable>
        </View>
    )
}

export default AppBar
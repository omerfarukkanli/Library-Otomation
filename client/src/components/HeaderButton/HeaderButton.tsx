
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../types'
import { StackNavigationProp } from '@react-navigation/stack'

const HeaderButton = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{ padding: 10 }}>
            <Ionicons name='person-circle-outline' size={35} color={"white"} />
        </TouchableOpacity>
    )
}

export default HeaderButton
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = () => {
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await AsyncStorage.getItem('USER')
                if (!user)  }
            catch (error) {
            }
        }
        getUser();
    }, [])



    return (
        <View>
            <Text>ProfileScreen</Text>
        </View>
    )
}

export default ProfileScreen
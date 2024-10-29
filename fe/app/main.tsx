import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import API_BASE_URL from "@/common";

export default function MainScreen() {
    const [userToken, setuserToken] = useState<string | null>(null)

    const handleProtectedRequest = async () => {
        if (!userToken) {
          Alert.alert("오류", "사용자 토큰이 없습니다.");
          return;
        }
    
        try {
          const response = await fetch(`${API_BASE_URL}/protected`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${userToken}`,
            },
          });
    
          const data = await response.json();
          Alert.alert("API 응답", JSON.stringify(data));
        } catch (error) {
          console.error("API 요청 오류:", error);
          Alert.alert("오류", "API 요청 중 오류가 발생했습니다.");
        }
      };
      

    useEffect(() =>{
        const fetchUserToken = async () => {
            const token = await SecureStore.getItemAsync('userToken')
            setuserToken(token)        
        }
        fetchUserToken()
    }, [])
    return (
        <View>
            <Text>main</Text>
            <Text>token : {userToken}</Text>
            <Button title="보호된 API 요청" onPress={handleProtectedRequest} />
        </View>
    )
}
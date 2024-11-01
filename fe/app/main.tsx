import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import API_BASE_URL from "@/common";
import { useNavigation } from "@react-navigation/native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // 추가된 import
import HomeScreen from "./HomeScreen";
import BoardScreen from "./BoardScreen"; // 게시판 스크린 컴포넌트
import MyInfoScreen from "./MyInfoScreen"; // 내 정보 스크린 컴포넌트

const Tab = createBottomTabNavigator(); // 탭 내비게이터 생성

export default function MainScreen() {
    const [userToken, setuserToken] = useState<string | null>(null)
    const navigation = useNavigation(); // useNavigation hook for navigation

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
    
    const handleLogout = async () => {
        try {
          await SecureStore.deleteItemAsync('userToken');
          Alert.alert("로그아웃", "성공적으로 로그아웃되었습니다.");
          navigation.navigate("index"); 

        } catch (error) {
          console.error("로그아웃 오류:", error);
          Alert.alert("오류", "로그아웃 중 오류가 발생했습니다.");
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
        <Tab.Navigator
        screenOptions={{
          tabBarIcon: () => null, // 아이콘을 표시하지 않도록 설정
          tabBarLabelStyle: {
            paddingBottom: 10, // 여백 조정으로 아이콘 없는 상태에 맞춤
            fontSize: 14,      // 원하는 크기로 조정
          },
          tabBarStyle: {
              height: 50, // 탭 높이를 조정하여 아이콘 없이 깔끔하게 표현
          },
      }}>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ tabBarLabel: "홈" }} // Optional: Set a label for the tab
            />
            <Tab.Screen 
                name="Bbs" 
                component={BoardScreen} 
                options={{ tabBarLabel: "게시판" }} // Optional: Set a label for the tab
            />
            <Tab.Screen 
                name="MyInfo" 
                component={MyInfoScreen} 
                options={{ tabBarLabel: "내 정보" }} // Optional: Set a label for the tab
            />
        </Tab.Navigator>
    )
}
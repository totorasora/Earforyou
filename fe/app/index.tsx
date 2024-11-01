import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as SecureStore from "expo-secure-store"
import { useNavigation } from "expo-router";
import API_BASE_URL from "@/common";

export default function LoginScreen() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const navigation = useNavigation();

  // 로그인 버튼 클릭 핸들러
  const handleLogin = async () => {
    console.log('handleLogin called', username, password); // 디버깅 로그 추가

    if (username && password) {
      console.log("login", API_BASE_URL);
      
      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        
        // 서버 응답 확인
        console.log("서버 응답:", response);
        if (response && response.ok) { 
          Alert.alert("회원가입되었습니다", "Welcome!");
          navigation.navigate('index')
        } else {
          
        }

        if (response && response.ok) { 
          // 응답 데이터 파싱
          const data = await response.json();
          console.log("로그인 성공:", data);
          
          await SecureStore.setItemAsync('userToken', data.token);
          Alert.alert("로그인 성공", "Welcome!");
          navigation.navigate("main");
        } else {
          // 오류 응답 처리
          const errorData = response ? await response.json() : {};
          console.log("로그인 실패:", errorData);
          Alert.alert("로그인 실패", errorData.message || "로그인에 실패했습니다.");
        }
      } catch (e) {
        // 네트워크 오류 및 기타 예외 처리
        console.log("네트워크 오류 또는 데이터 처리 오류:", e);
        Alert.alert("오류", "서버와 통신 중 문제가 발생했습니다.");
      }

    } else {
      Alert.alert("오류", "ID와 비밀번호를 입력하세요");
    }
};

const moveSingUp = () => {
  navigation.navigate("Signup"); // Signup 화면으로 이동
}


  return (
    <View style={styles.container}>
      {/* 타이틀 */}
      <Text style={styles.title}>Wisdom</Text>

      {/* ID 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="ID"
        defaultValue="admin"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        defaultValue="admin"
        value={password}
        onChangeText={setPassword}
      />

      <View>
        {/* 로그인 버튼 */}
        <Button
            title="로그인"
            onPress={handleLogin}
          />
      </View>
      <View style={styles.signup}>
         <Button
          title="회원가입"
          onPress={moveSingUp}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  signup: {
    marginTop: 10, 
  }
});

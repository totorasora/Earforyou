import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "expo-router";
import API_BASE_URL from "@/common";

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 

  const handleSignup = async () => {
    if (username && password) {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, password})
      });
      
      if (response && response.ok) { 
        // 응답 데이터 파싱
        const data = await response.json();
                
        Alert.alert("회원가입 성공", "Welcome!");
        navigation.navigate("index");
      } else {
        // 오류 응답 처리
        const errorData = response ? await response.json() : {};
        console.log("회원가입 실패:", errorData);
        Alert.alert("회원가입 실패", errorData.message || "회원가입에 실패했습니다.");
      }
    } else {
      Alert.alert("오류", "아이디와 비밀번호를 입력하세요.");
    }
  };

  const moveLogin = () => {
    navigation.navigate("index"); 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View>
        <Button title="회원가입" onPress={handleSignup} />
      </View>
      <View style={styles.login}>
        <Button title="로그인" onPress={moveLogin} />
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
  login: {
    marginTop: 10, 
  }
}); 
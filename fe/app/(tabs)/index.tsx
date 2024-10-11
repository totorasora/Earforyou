import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function LoginScreen() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 버튼 클릭 핸들러
  const handleLogin = () => {
    console.log('handleLogin called', id, password); // 디버깅 로그 추가

    if (id && password) {
      console.log("로그인성공");
      
      Alert.alert("로그인 성공", "Welcome!");
    } else {
      Alert.alert("오류", "ID와 비밀번호를 입력하세요");
    }
  };

  return (
    <View style={styles.container}>
      {/* 타이틀 */}
      <Text style={styles.title}>Wisdom</Text>

      {/* ID 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />

      {/* Password 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 로그인 버튼 */}
      <Button
        title="로그인"
        onPress={handleLogin}
      />
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
});

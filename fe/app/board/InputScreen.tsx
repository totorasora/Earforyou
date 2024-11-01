// screens/InputScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BoardStackParamList } from "./BoardScreen";


type InputScreenProps = NativeStackScreenProps<BoardStackParamList, 'Input'>;

export default function InputScreen({ navigation }: InputScreenProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title && content) {
      Alert.alert('게시글 작성 완료', `제목: ${title}\n내용: ${content}`);
      navigation.goBack();
    } else {
      Alert.alert('오류', '제목과 내용을 입력해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>제목</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>내용</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={content}
        onChangeText={setContent}
      />
      <Button title="작성 완료" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

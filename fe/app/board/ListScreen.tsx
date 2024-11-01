// screens/ListScreen.tsx
import React from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BoardStackParamList, Post } from "../BoardScreen";

type ListScreenProps = NativeStackScreenProps<BoardStackParamList, 'List'>;

const DUMMY_DATA: Post[] = [
  { id: '1', title: '첫 번째 게시글', content: '첫 번째 게시글의 내용입니다.' },
  { id: '2', title: '두 번째 게시글', content: '두 번째 게시글의 내용입니다.' },
  { id: '3', title: '세 번째 게시글', content: '세 번째 게시글의 내용입니다.' },
];

export default function ListScreen({ navigation }: ListScreenProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { post: item })}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="새 게시글 작성" onPress={() => navigation.navigate('Input')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemText: {
    fontSize: 18,
    padding: 10,
  },
});

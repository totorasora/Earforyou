// screens/BoardScreen.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './board/ListScreen';

import DetailScreen from "./board/DetailScreen";
import InputScreen from "./board/InputScreen";

export type Post = {
    id: string;
    title: string;
    content: string;
  };


export type BoardStackParamList = {
  List: undefined;
  Detail: { post: Post };
  Input: undefined;
};

const Stack = createNativeStackNavigator<BoardStackParamList>();

export default function BoardScreen() {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={ListScreen} options={{ title: '게시판 목록' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: '게시글 상세' }} />
      <Stack.Screen name="Input" component={InputScreen} options={{ title: '게시글 작성' }} />
    </Stack.Navigator>
  );
}

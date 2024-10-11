import React from "react";
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';

export default function HomeScreen() {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');
  const [value, onChangeValue] = React.useState('Useless Multiline Placeholder');

  return (
    <View>
      <View>
        <Text>View Example</Text>
        <View
          style={{
            flexDirection: 'row',
            height: 100,
            padding: 20,
          }}>

          <View style={{ backgroundColor: 'blue', flex: 0.3 }} />
          <View style={{ backgroundColor: 'red', flex: 0.5 }} />
        </View>
        <View>
          <Text>Text Example</Text>
          <Text style={styles.mainText}>
            Hello, <Text style={styles.boldText}>React Native!</Text>
          </Text>
        </View>

        <View>
          <Text>Image Example</Text>
          <Image
            style={styles.tinyLogo}
            source={require('@/assets/images/partial-react-logo.png')}
          />
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
          <Image
            style={styles.logo}
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }}
          />
        </View>

        <View>
          <Text>Text Input Example</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
          <Text>Multi Text Input Example</Text>
          <View
            style={{
              backgroundColor: value,
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
            }}>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              onChangeText={text => onChangeValue(text)}
              value={value}
              style={{ padding: 10 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontSize: 30,
    color: 'black',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
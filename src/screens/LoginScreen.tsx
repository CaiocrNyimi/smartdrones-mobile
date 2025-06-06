import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export default function LoginScreen({ navigation, setIsLoggedIn }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  const savedUser = await AsyncStorage.getItem('user');
  const savedPass = await AsyncStorage.getItem('pass');
    if (username === savedUser && password === savedPass) {
      setIsLoggedIn(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartDrones</Text>
      <Image source={require('@/assets/smartdrones-logo.png')} style={styles.logo} />
      <TextInput placeholder="Usuário" style={styles.input} onChangeText={setUsername} value={username} />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry onChangeText={setPassword} value={password} />
      <CustomButton title="Entrar" onPress={handleLogin} style={styles.button} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Criar conta</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  logo: { width: 200, height: 200, marginBottom: 30, resizeMode: 'contain' },
  input: { width: '100%', height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingHorizontal: 10 },
  button: { width: '100%', marginTop: 10 },
  link: { marginTop: 10, color: 'blue' }
});
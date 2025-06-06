import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';

type Props = {
  navigation: any;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export default function RegisterScreen({ navigation, setIsLoggedIn }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (username && password) {
      await AsyncStorage.setItem('user', username);
      await AsyncStorage.setItem('pass', password);
      setIsLoggedIn(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput placeholder="Usuário" style={styles.input} onChangeText={setUsername} value={username} />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry onChangeText={setPassword} value={password} />
      <CustomButton title="Registrar" onPress={handleRegister} style={styles.button} />
      <Text style={styles.link} onPress={() => navigation.goBack()}>Voltar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, marginBottom: 10, paddingHorizontal: 10 },
  button: { width: '100%', marginTop: 10 },
  link: { marginTop: 10, color: 'blue' }
});
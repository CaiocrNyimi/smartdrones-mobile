import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, Image, TouchableOpacity } from 'react-native';
import { login } from '../services/userService';
import { globalStyles } from '../styles/globalStyles';

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export default function LoginScreen({ setIsLoggedIn }: Props) {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await login(username, senha);
      if (userData) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Usuário ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/smartdrones-logo.png')} style={styles.logo} />

      <Text style={styles.label}>Usuário</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder="Digite seu usuário"
        placeholderTextColor="#999"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#999"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 32,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#2E7D32',
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
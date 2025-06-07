import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function ManageLeituraScreen({ route }: any) {
  const leitura = route?.params?.leitura;
  const [valor, setValor] = useState(leitura?.valor || '');
  const [unidade, setUnidade] = useState(leitura?.unidade || '');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
      />
      <TextInput
        style={styles.input}
        placeholder="Unidade"
        value={unidade}
        onChangeText={setUnidade}
      />
      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
});
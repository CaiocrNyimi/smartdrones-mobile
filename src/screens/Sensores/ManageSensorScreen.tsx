import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function ManageSensorScreen({ route }: any) {
  const sensor = route?.params?.sensor;
  const [tipo, setTipo] = useState(sensor?.tipo || '');
  const [unidade, setUnidade] = useState(sensor?.unidade || '');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={tipo}
        onChangeText={setTipo}
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

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LeituraSensor } from '../../models/LeituraSensor';
import LeituraService from '../../services/leituraService';
import { Colors } from '../../constants/Colors';

const ManageLeituraScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { leitura } = route.params as { leitura?: LeituraSensor };

  const [valor, setValor] = useState(leitura?.valor?.toString() || '');
  const [timestamp, setTimestamp] = useState(leitura?.timestamp || '');
  const [sensorId, setSensorId] = useState(
    leitura?.sensorId !== undefined ? leitura.sensorId.toString() : ''
  );

  const handleSubmit = async () => {
    const leituraData: LeituraSensor = {
      id: leitura?.id || 0,
      valor: parseFloat(valor),
      timestamp,
      sensorId: parseInt(sensorId, 10),
    };

    try {
      if (leitura?.id) {
        await LeituraService.update(leitura.id, leituraData);
      } else {
        await LeituraService.create(leituraData);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar leitura:', error);
      alert('Erro ao salvar leitura. Veja o console para mais detalhes.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        placeholder="Digite o valor da leitura"
        keyboardType="numeric"
        placeholderTextColor={Colors.textLight}
      />

      <Text style={styles.label}>Timestamp</Text>
      <TextInput
        style={styles.input}
        value={timestamp}
        onChangeText={setTimestamp}
        placeholder="Digite o timestamp"
        placeholderTextColor={Colors.textLight}
      />

      <Text style={styles.label}>Sensor ID</Text>
      <TextInput
        style={styles.input}
        value={sensorId}
        onChangeText={setSensorId}
        placeholder="Digite o ID do sensor"
        keyboardType="numeric"
        placeholderTextColor={Colors.textLight}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: Colors.primaryDark,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: Colors.textDark,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageLeituraScreen;
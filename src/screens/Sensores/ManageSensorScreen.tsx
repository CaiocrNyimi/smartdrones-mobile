import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SensorService from '../../services/sensorService';
import { Sensor } from '../../models/Sensor';
import { Colors } from '../../constants/Colors';

const ManageSensorScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { sensor } = route.params as { sensor?: Sensor };

  const [tipo, setTipo] = useState(sensor?.tipo || '');
  const [droneId, setDroneId] = useState(sensor?.droneId?.toString() || '');

  const handleSubmit = async () => {
    const sensorData: Sensor = {
      id: sensor?.id || 0,
      tipo,
      droneId: parseInt(droneId, 10),
    };

    try {
      if (sensor?.id) {
        await SensorService.update(sensor.id, sensorData);
      } else {
        await SensorService.create(sensorData);
      }
      navigation.goBack();
    } catch (error: any) {
      console.error('Erro ao salvar sensor:', error);
      Alert.alert('Erro', 'Não foi possível salvar o sensor. Verifique os dados e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo</Text>
      <TextInput
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Digite o tipo"
        placeholderTextColor={Colors.textLight}
      />

      <Text style={styles.label}>Drone ID</Text>
      <TextInput
        style={styles.input}
        value={droneId}
        onChangeText={setDroneId}
        placeholder="Digite o ID do drone"
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

export default ManageSensorScreen;
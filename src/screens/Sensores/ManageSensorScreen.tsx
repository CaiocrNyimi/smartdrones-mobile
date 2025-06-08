import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SensorService from '../../services/sensorService';
import { Sensor } from '../../models/Sensor';
import { globalStyles } from '../../styles/globalStyles';

const ManageSensorScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { sensor } = route.params as { sensor?: Sensor };

  const [tipo, setTipo] = useState(sensor?.tipo || '');
  const [droneId, setDroneId] = useState(sensor?.drone?.id?.toString() || '');

  const handleSubmit = async () => {
    const sensorData: Sensor = {
      id: sensor?.id || 0,
      tipo,
      drone: droneId ? { id: parseInt(droneId, 10) } : undefined,
    };

    try {
      if (sensor?.id) {
        await SensorService.update(sensor.id, sensorData);
      } else {
        await SensorService.create(sensorData);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar sensor:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.label}>Tipo</Text>
      <TextInput
        style={globalStyles.input}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Digite o tipo"
      />

      <Text style={globalStyles.label}>Drone ID</Text>
      <TextInput
        style={globalStyles.input}
        value={droneId}
        onChangeText={setDroneId}
        placeholder="Digite o ID do drone"
        keyboardType="numeric"
      />

      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default ManageSensorScreen;
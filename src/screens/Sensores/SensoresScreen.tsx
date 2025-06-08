import React, { useState, useCallback } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SensorService from '../../services/sensorService';
import SensorCard from '../../components/SensorCard';
import { globalStyles } from '../../styles/globalStyles';
import { Sensor } from '../../models/Sensor';
import { NavigationProps } from '../../types/navigation';

const SensoresScreen = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const navigation = useNavigation<NavigationProps>();

  const fetchSensors = async () => {
    try {
      const data = await SensorService.getAll();
      setSensors(data);
    } catch (error) {
      console.error('Erro ao buscar sensores:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSensors();
    }, [])
  );

  const handleView = (id: number) => {
    const sensor = sensors.find((s) => s.id === id);
    if (sensor) navigation.navigate('SensorDetail', { sensor });
  };

  const handleEdit = (id: number) => {
    const sensor = sensors.find((s) => s.id === id);
    if (sensor) navigation.navigate('ManageSensor', { sensor });
  };

  const handleDelete = async (id: number) => {
    try {
      console.log('Deletando sensor com ID:', id);
      await SensorService.delete(id);
      await fetchSensors();
    } catch (error) {
      console.error('Erro ao deletar sensor:', error);
      alert('Erro ao deletar o sensor. Verifique o console.');
    }
  };


  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('ManageSensor', {})}
      >
        <Text style={globalStyles.buttonText}>Novo Sensor</Text>
      </TouchableOpacity>
      {sensors?.map((sensor) => (
        <SensorCard
          key={sensor.id}
          sensor={{
            id: sensor.id,
            tipo: sensor.tipo,
            droneId: sensor.droneId ?? 0,
          }}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </ScrollView>
  );
};

export default SensoresScreen;
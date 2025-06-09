import React, { useState, useCallback } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DroneService from '../../services/droneService';
import DroneCard from '../../components/DroneCard';
import { globalStyles } from '../../styles/globalStyles';
import { Drone } from '../../models/Drone';
import { NavigationProps } from '../../types/navigation';

const DronesScreen = () => {
  const [drones, setDrones] = useState<Drone[]>([]);
  const navigation = useNavigation<NavigationProps>();

  const fetchDrones = async () => {
    try {
      const data = await DroneService.getAll();
      setDrones(data);
    } catch (error) {
      console.error('Erro ao buscar drones:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDrones();
    }, [])
  );

  const handleView = (id: number) => {
    const drone = drones.find((d) => d.id === id);
    if (drone) navigation.navigate('DroneDetail', { drone });
  };

  const handleEdit = (id: number) => {
    const drone = drones.find((d) => d.id === id);
    if (drone) navigation.navigate('ManageDrone', { drone });
  };

  const handleDelete = async (id: number) => {
    try {
      const success = await DroneService.delete(id);
      if (success) {
        await fetchDrones();
      } else {
        alert('Erro ao deletar. Verifique se o drone está vinculado a sensores ou leituras.');
      }
    } catch (error) {
      console.error('Erro ao deletar drone:', error);
      alert('Erro interno ao deletar o drone. Veja o console para detalhes.');
    }
  };

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <TouchableOpacity style={globalStyles.addButton} onPress={() => navigation.navigate('ManageDrone', {})}>
        <Text style={globalStyles.buttonText}>Novo Drone</Text>
      </TouchableOpacity>

      {drones?.map((drone) => (
        <DroneCard
          key={drone.id}
          drone={{
            id: drone.id,
            modelo: drone.modelo,
            status: drone.status ?? 'Desativado',
          }}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </ScrollView>
  );
};

export default DronesScreen;
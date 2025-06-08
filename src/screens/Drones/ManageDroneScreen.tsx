import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import DroneService from '../../services/droneService';
import { Drone } from '../../models/Drone';
import { globalStyles } from '../../styles/globalStyles';

const ManageDroneScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { drone } = route.params as { drone?: Drone };

  const [modelo, setModelo] = useState(drone?.modelo || '');
  const [status, setStatus] = useState(drone?.status || 'Ativo');

  const handleSubmit = async () => {
    const droneData: Drone = {
      id: drone?.id || 0,
      modelo,
      status,
    };

    try {
      if (drone?.id) {
        await DroneService.update(drone.id, droneData);
      } else {
        await DroneService.create(droneData);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar drone:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.label}>Modelo</Text>
      <TextInput
        style={globalStyles.input}
        value={modelo}
        onChangeText={setModelo}
        placeholder="Digite o modelo"
      />

      <Text style={globalStyles.label}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue: any) => setStatus(itemValue)}
        style={globalStyles.input}
      >
        <Picker.Item label="Ativo" value="Ativo" />
        <Picker.Item label="Manutenção" value="Manutenção" />
        <Picker.Item label="Desativado" value="Desativado" />
      </Picker>

      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default ManageDroneScreen;
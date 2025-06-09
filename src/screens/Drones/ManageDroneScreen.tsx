import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import DroneService from '../../services/droneService';
import { Drone } from '../../models/Drone';
import { Colors } from '../../constants/Colors';

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
    <View style={styles.container}>
      <Text style={styles.label}>Modelo</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
        placeholder="Digite o modelo"
        placeholderTextColor={Colors.textLight}
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue: any) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Ativo" value="Ativo" />
          <Picker.Item label="Manutenção" value="Manutenção" />
          <Picker.Item label="Desativado" value="Desativado" />
        </Picker>
      </View>

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
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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

export default ManageDroneScreen;
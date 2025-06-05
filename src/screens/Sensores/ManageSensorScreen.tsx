import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Sensor, Drone } from '../../data/dummyData';
import { fetchSensorById, addSensor, modifySensor, fetchDrones } from '../../services/apiService';
import { globalStyles } from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../constants/Colors';

type ManageSensorScreenRouteProp = RouteProp<RootStackParamList, 'ManageSensor'>;
type ManageSensorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ManageSensor'>;

interface ManageSensorScreenProps {
  route: ManageSensorScreenRouteProp;
  navigation: ManageSensorScreenNavigationProp;
}

const ManageSensorScreen: React.FC<ManageSensorScreenProps> = ({ route, navigation }) => {
  const { sensorId } = route.params || {};
  const [tipo, setTipo] = useState<string>('');
  const [droneId, setDroneId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [availableDrones, setAvailableDrones] = useState<Drone[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const drones = await fetchDrones();
        setAvailableDrones(drones);

        if (sensorId) {
          setIsEditing(true);
          const sensor = await fetchSensorById(sensorId);
          if (sensor) {
            setTipo(sensor.tipo);
            setDroneId(sensor.drone_id);
          } else {
            Alert.alert('Erro', 'Sensor não encontrado.');
            navigation.goBack();
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados para o formulário do sensor:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [sensorId, navigation]);

  const handleSave = async () => {
    if (!tipo.trim() || droneId === undefined) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      if (isEditing && sensorId) {
        const updatedSensor: Sensor = { sensor_id: sensorId, tipo, drone_id: droneId };
        await modifySensor(updatedSensor);
        Alert.alert('Sucesso', 'Sensor atualizado com sucesso!');
      } else {
        const newSensor: Omit<Sensor, 'sensor_id'> = { tipo, drone_id: droneId };
        await addSensor(newSensor);
        Alert.alert('Sucesso', 'Sensor adicionado com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar sensor:', error);
      Alert.alert('Erro', 'Não foi possível salvar o sensor.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.subtitle}>
        {isEditing ? 'Editar Sensor' : 'Adicionar Novo Sensor'}
      </Text>

      <Text style={globalStyles.textInputLabel}>Tipo:</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite o tipo do sensor (ex: Temperatura, Umidade)"
        value={tipo}
        onChangeText={setTipo}
      />

      <Text style={globalStyles.textInputLabel}>Drone Associado:</Text>
      <View style={globalStyles.picker}>
        <Picker
          selectedValue={droneId}
          onValueChange={(itemValue: number) => setDroneId(itemValue)}
          style={globalStyles.pickerItem}
        >
          <Picker.Item label="Selecione um Drone" value={undefined} />
          {availableDrones.map(drone => (
            <Picker.Item key={drone.drone_id} label={`${drone.modelo} (ID: ${drone.drone_id})`} value={drone.drone_id} />
          ))}
        </Picker>
      </View>

      <CustomButton
        title={isEditing ? 'Salvar Alterações' : 'Adicionar Sensor'}
        onPress={handleSave}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    marginTop: 10,
  },
});

export default ManageSensorScreen;
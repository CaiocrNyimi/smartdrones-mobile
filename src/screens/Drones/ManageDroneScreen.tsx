import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Drone } from '../../data/dummyData';
import { fetchDroneById, addDrone, modifyDrone } from '../../services/apiService';
import { globalStyles } from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../constants/Colors';

type ManageDroneScreenRouteProp = RouteProp<RootStackParamList, 'ManageDrone'>;
type ManageDroneScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ManageDrone'>;

interface ManageDroneScreenProps {
  route: ManageDroneScreenRouteProp;
  navigation: ManageDroneScreenNavigationProp;
}

const ManageDroneScreen: React.FC<ManageDroneScreenProps> = ({ route, navigation }) => {
  const { droneId } = route.params || {};
  const [modelo, setModelo] = useState<string>('');
  const [status, setStatus] = useState<'Ativo' | 'Manutenção' | 'Desativado'>('Ativo');
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (droneId) {
      setIsEditing(true);
      setLoading(true);
      const loadDrone = async () => {
        try {
          const drone = await fetchDroneById(droneId);
          if (drone) {
            setModelo(drone.modelo);
            setStatus(drone.status);
          } else {
            Alert.alert('Erro', 'Drone não encontrado.');
            navigation.goBack();
          }
        } catch (error) {
          console.error('Erro ao carregar drone para edição:', error);
          Alert.alert('Erro', 'Não foi possível carregar os dados do drone.');
          navigation.goBack();
        } finally {
          setLoading(false);
        }
      };
      loadDrone();
    }
  }, [droneId, navigation]);

  const handleSave = async () => {
    if (!modelo.trim()) {
      Alert.alert('Erro', 'O campo Modelo é obrigatório.');
      return;
    }

    setLoading(true);
    try {
      if (isEditing && droneId) {
        const updatedDrone: Drone = { drone_id: droneId, modelo, status };
        await modifyDrone(updatedDrone);
        Alert.alert('Sucesso', 'Drone atualizado com sucesso!');
      } else {
        const newDrone: Omit<Drone, 'drone_id'> = { modelo, status };
        await addDrone(newDrone);
        Alert.alert('Sucesso', 'Drone adicionado com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar drone:', error);
      Alert.alert('Erro', 'Não foi possível salvar o drone.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando dados do drone...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.subtitle}>
        {isEditing ? 'Editar Drone' : 'Adicionar Novo Drone'}
      </Text>

      <Text style={globalStyles.textInputLabel}>Modelo:</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite o modelo do drone"
        value={modelo}
        onChangeText={setModelo}
      />

      <Text style={globalStyles.textInputLabel}>Status:</Text>
      <View style={globalStyles.picker}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue: 'Ativo' | 'Manutenção' | 'Desativado') => setStatus(itemValue)}
          style={globalStyles.pickerItem}
        >
          <Picker.Item label="Ativo" value="Ativo" />
          <Picker.Item label="Manutenção" value="Manutenção" />
          <Picker.Item label="Desativado" value="Desativado" />
        </Picker>
      </View>

      <CustomButton
        title={isEditing ? 'Salvar Alterações' : 'Adicionar Drone'}
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

export default ManageDroneScreen;
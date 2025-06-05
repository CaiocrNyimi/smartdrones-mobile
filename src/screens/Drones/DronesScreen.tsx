import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Drone } from '../../data/dummyData';
import { fetchDrones, removeDrone } from '../../services/apiService';
import { globalStyles } from '../../styles/globalStyles';
import DroneCard from '../../components/DroneCard';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../constants/Colors';

type DronesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Drones'>;

interface DronesScreenProps {
  navigation: DronesScreenNavigationProp;
}

const DronesScreen: React.FC<DronesScreenProps> = ({ navigation }) => {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadDrones = async () => {
    setLoading(true);
    try {
      const fetchedDrones = await fetchDrones();
      setDrones(fetchedDrones);
    } catch (error) {
      console.error('Erro ao carregar drones:', error);
      Alert.alert('Erro', 'Não foi possível carregar os drones.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDrones();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadDrones();
  };

  const handleDeleteDrone = async (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este drone? Sensores associados impedirão a exclusão.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const success = await removeDrone(id);
              if (success) {
                Alert.alert('Sucesso', 'Drone excluído com sucesso.');
                loadDrones();
              } else {
                Alert.alert('Erro', 'Não foi possível excluir o drone. Verifique se há sensores ou leituras associados.');
              }
            } catch (error) {
              console.error('Erro ao excluir drone:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao excluir o drone.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando Drones...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subtitle}>Lista de Drones</Text>
      <CustomButton
        title="Adicionar Novo Drone"
        onPress={() => navigation.navigate('ManageDrone', { droneId: undefined })}
      />
      {drones.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum drone cadastrado.</Text>
      ) : (
        <FlatList
          data={drones}
          keyExtractor={(item) => item.drone_id.toString()}
          renderItem={({ item }) => (
            <DroneCard
              drone={item}
              onView={(id) => navigation.navigate('DroneDetail', { droneId: id })}
              onEdit={(id) => navigation.navigate('ManageDrone', { droneId: id })}
              onDelete={handleDeleteDrone}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[Colors.primary]}
            />
          }
        />
      )}
    </View>
  );
};

export default DronesScreen;
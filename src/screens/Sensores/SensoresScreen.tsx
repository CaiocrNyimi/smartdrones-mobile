import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Sensor } from '../../data/dummyData';
import { fetchSensores, removeSensor } from '../../services/apiService';
import { globalStyles } from '../../styles/globalStyles';
import SensorCard from '../../components/SensorCard';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../constants/Colors';

type SensoresScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Sensores'>;

interface SensoresScreenProps {
  navigation: SensoresScreenNavigationProp;
}

const SensoresScreen: React.FC<SensoresScreenProps> = ({ navigation }) => {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadSensores = async () => {
    setLoading(true);
    try {
      const fetchedSensores = await fetchSensores();
      setSensores(fetchedSensores);
    } catch (error) {
      console.error('Erro ao carregar sensores:', error);
      Alert.alert('Erro', 'Não foi possível carregar os sensores.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSensores();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadSensores();
  };

  const handleDeleteSensor = async (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este sensor? Leituras associadas impedirão a exclusão.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const success = await removeSensor(id);
              if (success) {
                Alert.alert('Sucesso', 'Sensor excluído com sucesso.');
                loadSensores();
              } else {
                Alert.alert('Erro', 'Não foi possível excluir o sensor. Verifique se há leituras associadas.');
              }
            } catch (error) {
              console.error('Erro ao excluir sensor:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao excluir o sensor.');
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
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando Sensores...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subtitle}>Lista de Sensores</Text>
      <CustomButton
        title="Adicionar Novo Sensor"
        onPress={() => navigation.navigate('ManageSensor', { sensorId: undefined })}
      />
      {sensores.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum sensor cadastrado.</Text>
      ) : (
        <FlatList
          data={sensores}
          keyExtractor={(item) => item.sensor_id.toString()}
          renderItem={({ item }) => (
            <SensorCard
              sensor={item}
              onView={(id) => navigation.navigate('SensorDetail', { sensorId: id })}
              onEdit={(id) => navigation.navigate('ManageSensor', { sensorId: id })}
              onDelete={handleDeleteSensor}
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

export default SensoresScreen;
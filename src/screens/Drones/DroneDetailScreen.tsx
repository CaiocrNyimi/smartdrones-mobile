import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Drone, Sensor } from '../../data/dummyData';
import { fetchDroneById, fetchSensores } from '../../services/apiService';
import { globalStyles } from '../../styles/globalStyles';
import { Colors } from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';

type DroneDetailScreenRouteProp = RouteProp<RootStackParamList, 'DroneDetail'>;
type DroneDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DroneDetail'>;

interface DroneDetailScreenProps {
  route: DroneDetailScreenRouteProp;
  navigation: DroneDetailScreenNavigationProp;
}

const DroneDetailScreen: React.FC<DroneDetailScreenProps> = ({ route, navigation }) => {
  const { droneId } = route.params;
  const [drone, setDrone] = useState<Drone | null>(null);
  const [associatedSensors, setAssociatedSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDroneDetails = async () => {
      setLoading(true);
      try {
        const fetchedDrone = await fetchDroneById(droneId);
        if (fetchedDrone) {
          setDrone(fetchedDrone);
          const allSensors = await fetchSensores();
          const sensorsForDrone = allSensors.filter(s => s.drone_id === fetchedDrone.drone_id);
          setAssociatedSensors(sensorsForDrone);
        } else {
          Alert.alert('Erro', 'Drone não encontrado.');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes do drone:', error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do drone.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    loadDroneDetails();
  }, [droneId, navigation]);

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando detalhes do Drone...</Text>
      </View>
    );
  }

  if (!drone) {
    return (
      <View style={globalStyles.container}>
        <Text style={{ textAlign: 'center', fontSize: 18, color: Colors.danger }}>Drone não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.card}>
        <Text style={styles.label}>ID do Drone:</Text>
        <Text style={styles.value}>{drone.drone_id}</Text>

        <Text style={styles.label}>Modelo:</Text>
        <Text style={styles.value}>{drone.modelo}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={[
          styles.value,
          drone.status === 'Ativo' && styles.statusActive,
          drone.status === 'Manutenção' && styles.statusMaintenance,
          drone.status === 'Desativado' && styles.statusInactive,
        ]}>{drone.status}</Text>

        <Text style={styles.label}>Sensores Associados:</Text>
        {associatedSensors.length > 0 ? (
          associatedSensors.map(sensor => (
            <Text key={sensor.sensor_id} style={styles.associatedItem}>
              - {sensor.tipo} (ID: {sensor.sensor_id})
            </Text>
          ))
        ) : (
          <Text style={styles.noAssociated}>Nenhum sensor associado a este drone.</Text>
        )}
      </View>

      <CustomButton
        title="Voltar para Drones"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    color: Colors.textLight,
    marginBottom: 5,
  },
  statusActive: {
    color: Colors.primaryDark,
  },
  statusMaintenance: {
    color: Colors.accent,
  },
  statusInactive: {
    color: Colors.danger,
  },
  associatedItem: {
    fontSize: 16,
    color: Colors.textLight,
    marginLeft: 10,
    marginTop: 5,
  },
  noAssociated: {
    fontSize: 16,
    color: Colors.textLight,
    fontStyle: 'italic',
  }
});

export default DroneDetailScreen;
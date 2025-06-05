import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Sensor, LeituraSensor, Drone } from '../../data/dummyData';
import { fetchSensorById, fetchLeiturasBySensor, fetchDroneById } from '../../services/apiService';
import { globalStyles } from '../../styles/globalStyles';
import { Colors } from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';

type SensorDetailScreenRouteProp = RouteProp<RootStackParamList, 'SensorDetail'>;
type SensorDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SensorDetail'>;

interface SensorDetailScreenProps {
  route: SensorDetailScreenRouteProp;
  navigation: SensorDetailScreenNavigationProp;
}

const SensorDetailScreen: React.FC<SensorDetailScreenProps> = ({ route, navigation }) => {
  const { sensorId } = route.params;
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const [drone, setDrone] = useState<Drone | null>(null);
  const [associatedLeituras, setAssociatedLeituras] = useState<LeituraSensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSensorDetails = async () => {
      setLoading(true);
      try {
        const fetchedSensor = await fetchSensorById(sensorId);
        if (fetchedSensor) {
          setSensor(fetchedSensor);
          const fetchedDrone = await fetchDroneById(fetchedSensor.drone_id);
          setDrone(fetchedDrone || null);

          const leiturasForSensor = await fetchLeiturasBySensor(sensorId);
          setAssociatedLeituras(leiturasForSensor);
        } else {
          Alert.alert('Erro', 'Sensor não encontrado.');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes do sensor:', error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do sensor.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    loadSensorDetails();
  }, [sensorId, navigation]);

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando detalhes do Sensor...</Text>
      </View>
    );
  }

  if (!sensor) {
    return (
      <View style={globalStyles.container}>
        <Text style={{ textAlign: 'center', fontSize: 18, color: Colors.danger }}>Sensor não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.card}>
        <Text style={styles.label}>ID do Sensor:</Text>
        <Text style={styles.value}>{sensor.sensor_id}</Text>

        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{sensor.tipo}</Text>

        <Text style={styles.label}>Drone Associado:</Text>
        {drone ? (
          <Text style={styles.value}>
            {drone.modelo} (ID: {drone.drone_id})
          </Text>
        ) : (
          <Text style={styles.noAssociated}>Nenhum drone associado ou drone não encontrado.</Text>
        )}

        <Text style={styles.label}>Leituras Associadas:</Text>
        {associatedLeituras.length > 0 ? (
          associatedLeituras.map(leitura => (
            <Text key={leitura.leitura_id} style={styles.associatedItem}>
              - Valor: {leitura.valor}, Data: {leitura.timestamp.toLocaleString()} (ID: {leitura.leitura_id})
            </Text>
          ))
        ) : (
          <Text style={styles.noAssociated}>Nenhuma leitura associada a este sensor.</Text>
        )}
      </View>

      <CustomButton
        title="Voltar para Sensores"
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

export default SensorDetailScreen;
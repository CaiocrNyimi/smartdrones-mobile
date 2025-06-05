import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { LeituraSensor, Sensor, Drone } from '../../data/dummyData';
import { fetchLeituraById, fetchSensorById, fetchDroneById } from '../../services/apiService';
import { globalStyles } from '../../styles/globalStyles';
import { Colors } from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';

type LeituraDetailScreenRouteProp = RouteProp<RootStackParamList, 'LeituraDetail'>;
type LeituraDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LeituraDetail'>;

interface LeituraDetailScreenProps {
  route: LeituraDetailScreenRouteProp;
  navigation: LeituraDetailScreenNavigationProp;
}

const LeituraDetailScreen: React.FC<LeituraDetailScreenProps> = ({ route, navigation }) => {
  const { leituraId } = route.params;
  const [leitura, setLeitura] = useState<LeituraSensor | null>(null);
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const [drone, setDrone] = useState<Drone | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadLeituraDetails = async () => {
      setLoading(true);
      try {
        const fetchedLeitura = await fetchLeituraById(leituraId);
        if (fetchedLeitura) {
          setLeitura(fetchedLeitura);
          const fetchedSensor = await fetchSensorById(fetchedLeitura.sensor_id);
          if (fetchedSensor) {
            setSensor(fetchedSensor);
            const fetchedDrone = await fetchDroneById(fetchedSensor.drone_id);
            setDrone(fetchedDrone || null);
          } else {
            console.warn('Sensor associado à leitura não encontrado.');
          }
        } else {
          Alert.alert('Erro', 'Leitura não encontrada.');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes da leitura:', error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes da leitura.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    loadLeituraDetails();
  }, [leituraId, navigation]);

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando detalhes da Leitura...</Text>
      </View>
    );
  }

  if (!leitura) {
    return (
      <View style={globalStyles.container}>
        <Text style={{ textAlign: 'center', fontSize: 18, color: Colors.danger }}>Leitura não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.card}>
        <Text style={styles.label}>ID da Leitura:</Text>
        <Text style={styles.value}>{leitura.leitura_id}</Text>

        <Text style={styles.label}>Valor:</Text>
        <Text style={styles.value}>{leitura.valor}</Text>

        <Text style={styles.label}>Data/Hora:</Text>
        <Text style={styles.value}>{leitura.timestamp.toLocaleString()}</Text>

        <Text style={styles.label}>Sensor Associado:</Text>
        {sensor ? (
          <Text style={styles.value}>
            {sensor.tipo} (ID: {sensor.sensor_id})
          </Text>
        ) : (
          <Text style={styles.noAssociated}>Sensor associado não encontrado.</Text>
        )}

        <Text style={styles.label}>Drone do Sensor:</Text>
        {drone ? (
          <Text style={styles.value}>
            {drone.modelo} (ID: {drone.drone_id})
          </Text>
        ) : (
          <Text style={styles.noAssociated}>Drone do sensor não encontrado.</Text>
        )}
      </View>

      <CustomButton
        title="Voltar para Leituras"
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
  noAssociated: {
    fontSize: 16,
    color: Colors.textLight,
    fontStyle: 'italic',
  }
});

export default LeituraDetailScreen;
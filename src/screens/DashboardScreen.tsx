import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { Colors } from '../constants/Colors';
import { globalStyles } from '../styles/globalStyles';

const DashboardScreen: React.FC = () => {
  const [data, setData] = useState<{
    totalDrones: number;
    totalSensores: number;
    totalLeituras: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [dronesRes, sensoresRes, leiturasRes] = await Promise.all([
          axios.get('http://localhost:8080/api/drones'),
          axios.get('http://localhost:8080/api/sensors'),
          axios.get('http://localhost:8080/api/leituras'),
        ]);

        setData({
          totalDrones: dronesRes.data.length,
          totalSensores: sensoresRes.data.length,
          totalLeituras: leiturasRes.data.length,
        });
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de Drones</Text>
        <Text style={styles.cardValue}>{data?.totalDrones}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de Sensores</Text>
        <Text style={styles.cardValue}>{data?.totalSensores}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de Leituras</Text>
        <Text style={styles.cardValue}>{data?.totalLeituras}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default DashboardScreen;
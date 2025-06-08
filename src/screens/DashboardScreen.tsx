import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Colors } from '../constants/Colors';

const DashboardScreen: React.FC = () => {
  const [data, setData] = useState({
    totalDrones: 0,
    totalSensores: 0,
    totalLeituras: 0,
    dronesPorStatus: {} as Record<string, number>,
    sensoresPorTipo: {} as Record<string, number>,
    ultimaLeitura: null as null | {
      valor: number;
      tipo: string;
      modeloDrone: string;
      timestamp: string;
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [dronesRes, sensoresRes, leiturasRes] = await Promise.all([
          axios.get('http://192.168.0.133:8080/api/drones'),
          axios.get('http://192.168.0.133:8080/api/sensors'),
          axios.get('http://192.168.0.133:8080/api/leituras'),
        ]);

        const drones = dronesRes.data.content || [];
        const sensores = sensoresRes.data.content || [];
        const leituras = leiturasRes.data.content || [];

        const dronesPorStatus: Record<string, number> = {};
        drones.forEach((d: any) => {
          dronesPorStatus[d.status] = (dronesPorStatus[d.status] || 0) + 1;
        });

        const sensoresPorTipo: Record<string, number> = {};
        sensores.forEach((s: any) => {
          sensoresPorTipo[s.tipo] = (sensoresPorTipo[s.tipo] || 0) + 1;
        });

        let ultimaLeitura = null;
        if (leituras.length > 0) {
          const l = leituras[leituras.length - 1];
          ultimaLeitura = {
            valor: l.valor,
            tipo: l.sensor?.tipo,
            modeloDrone: l.sensor?.drone?.modelo,
            timestamp: l.timestamp,
          };
        }

        setData({
          totalDrones: drones.length,
          totalSensores: sensores.length,
          totalLeituras: leituras.length,
          dronesPorStatus,
          sensoresPorTipo,
          ultimaLeitura,
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total de Drones</Text>
          <Text style={styles.cardValue}>{data.totalDrones}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total de Sensores</Text>
          <Text style={styles.cardValue}>{data.totalSensores}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total de Leituras</Text>
          <Text style={styles.cardValue}>{data.totalLeituras}</Text>
        </View>

        {Object.entries(data.dronesPorStatus).map(([status, count]) => (
          <View key={status} style={styles.card}>
            <Text style={styles.cardTitle}>Drones - {status}</Text>
            <Text>{count}</Text>
          </View>
        ))}

        {Object.entries(data.sensoresPorTipo).map(([tipo, count]) => (
          <View key={tipo} style={styles.card}>
            <Text style={styles.cardTitle}>Sensores - {tipo}</Text>
            <Text>{count}</Text>
          </View>
        ))}

        {data.ultimaLeitura && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Última Leitura</Text>
            <Text>Valor: {data.ultimaLeitura.valor}</Text>
            <Text>Tipo: {data.ultimaLeitura.tipo}</Text>
            <Text>Drone: {data.ultimaLeitura.modeloDrone}</Text>
            <Text>
              Data: {new Date(data.ultimaLeitura.timestamp).toLocaleString()}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
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
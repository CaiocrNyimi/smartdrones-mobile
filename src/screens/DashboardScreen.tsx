import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import { Colors } from '../constants/Colors';
import {
  fetchRiscoMedio,
  fetchTotalLeiturasPorTipo,
  fetchDroneStatuses,
  fetchLeiturasLast3Days,
  fetchAverageValorSensorType,
} from '../services/apiService';

interface StatisticCardProps {
  title: string;
  value: string | number;
  description?: string;
  color?: string;
  style?: any;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, description, color = Colors.primaryDark, style }) => (
  <View style={[styles.statisticCard, { borderColor: color }, style]}>
    <Text style={styles.statisticTitle}>{title}</Text>
    <Text style={[styles.statisticValue, { color }]}>{value}</Text>
    {description && <Text style={styles.statisticDescription}>{description}</Text>}
  </View>
);

const DashboardScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [riscoMedio, setRiscoMedio] = useState<number | null>(null);
  const [totalTemperatura, setTotalTemperatura] = useState<number | null>(null);
  const [totalUmidade, setTotalUmidade] = useState<number | null>(null);
  const [droneStatuses, setDroneStatuses] = useState<{ status: string; total_drones: number }[]>([]);
  const [leituras3Dias, setLeituras3Dias] = useState<{ drone_id: number; modelo: string; leituras_ultimos_3dias: number }[]>([]);
  const [mediaValorSensores, setMediaValorSensores] = useState<{ tipo: string; media_valor: number }[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const rm = await fetchRiscoMedio();
      setRiscoMedio(parseFloat(rm.toFixed(2)));
      const tt = await fetchTotalLeiturasPorTipo('Temperatura');
      setTotalTemperatura(tt);
      const tu = await fetchTotalLeiturasPorTipo('Umidade');
      setTotalUmidade(tu);
      const ds = await fetchDroneStatuses();
      setDroneStatuses(ds);
      const l3d = await fetchLeiturasLast3Days();
      setLeituras3Dias(l3d);
      const avst = await fetchAverageValorSensorType();
      setMediaValorSensores(avst);

    } catch (error) {
      console.error('Erro ao carregar dados do Dashboard:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do dashboard.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const getRiscoStatus = (risco: number | null): string => {
    if (risco === null) return 'N/A';
    if (risco > 2) return 'Alto Risco';
    if (risco > 1) return 'Risco Médio';
    return 'Baixo Risco';
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando Dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={globalStyles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[Colors.primary]}
        />
      }
    >
      <Text style={globalStyles.title}>Dashboard</Text>

      <StatisticCard
        title="Risco Médio das Leituras"
        value={riscoMedio !== null ? riscoMedio : 'N/A'}
        description={`Status: ${getRiscoStatus(riscoMedio)}`}
        color={riscoMedio !== null && riscoMedio > 2 ? Colors.danger : (riscoMedio !== null && riscoMedio > 1 ? Colors.accent : Colors.primaryDark)}
      />

      <View style={styles.rowContainer}>
        <StatisticCard
          title="Leituras Temperatura"
          value={totalTemperatura !== null ? totalTemperatura : 'N/A'}
          color={Colors.info}
          style={styles.halfCard}
        />
        <StatisticCard
          title="Leituras Umidade"
          value={totalUmidade !== null ? totalUmidade : 'N/A'}
          color={Colors.info}
          style={styles.halfCard}
        />
      </View>

      <Text style={styles.sectionTitle}>Status dos Drones</Text>
      {droneStatuses.length > 0 ? (
        droneStatuses.map((item, index) => (
          <StatisticCard
            key={index}
            title={`Drones ${item.status}`}
            value={item.total_drones}
            color={
                item.status === 'Ativo' ? Colors.primaryDark :
                item.status === 'Manutenção' ? Colors.accent :
                Colors.danger
            }
          />
        ))
      ) : (
        <Text style={styles.noDataText}>Nenhum status de drone disponível.</Text>
      )}

      <Text style={styles.sectionTitle}>Leituras Últimos 3 Dias (por Drone)</Text>
      {leituras3Dias.length > 0 ? (
        leituras3Dias.map((item) => (
          <StatisticCard
            key={item.drone_id}
            title={`Drone ${item.modelo} (ID: ${item.drone_id})`}
            value={`${item.leituras_ultimos_3dias} leituras`}
            color={Colors.primary}
          />
        ))
      ) : (
        <Text style={styles.noDataText}>Nenhuma leitura nos últimos 3 dias.</Text>
      )}

      <Text style={styles.sectionTitle}>Média de Valor por Tipo de Sensor (Valor {'>'} 10)</Text>
      {mediaValorSensores.length > 0 ? (
        mediaValorSensores.map((item, index) => (
          <StatisticCard
            key={index}
            title={`Média Valor (${item.tipo})`}
            value={item.media_valor.toFixed(2)}
            color={Colors.primaryDark}
          />
        ))
      ) : (
        <Text style={styles.noDataText}>Nenhuma média de valor disponível para sensores.</Text>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statisticCard: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  statisticTitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 5,
  },
  statisticValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statisticDescription: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfCard: {
    flex: 1,
    marginHorizontal: 5,
  },
  sectionTitle: {
    ...globalStyles.subtitle,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'left',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    paddingBottom: 5,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 10,
    color: Colors.textLight,
    fontStyle: 'italic',
  }
});

export default DashboardScreen;
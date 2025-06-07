import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchLeituras } from '../../services/leituraService';

export default function LeiturasScreen() {
  const [leituras, setLeituras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeituras()
      .then(setLeituras)
      .catch(error => console.error('Erro ao buscar leituras:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={leituras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.label}>Valor:</Text>
              <Text>{item.valor}</Text>
              <Text style={styles.label}>Unidade:</Text>
              <Text>{item.unidade}</Text>
              <Text style={styles.label}>Sensor ID:</Text>
              <Text>{item.sensor?.id}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
  },
});
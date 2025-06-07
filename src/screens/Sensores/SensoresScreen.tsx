import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchSensores } from '../../services/sensorService';

export default function SensoresScreen() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSensores()
      .then(setSensores)
      .catch(error => console.error('Erro ao buscar sensores:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={sensores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.label}>Tipo:</Text>
              <Text>{item.tipo}</Text>
              <Text style={styles.label}>Unidade:</Text>
              <Text>{item.unidade}</Text>
              <Text style={styles.label}>Drone:</Text>
              <Text>{item.drone?.modelo}</Text>
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
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getDrones } from '../../services/droneService';
import { globalStyles } from '../../styles/globalStyles';

export default function DronesScreen() {
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const data = await getDrones();
        setDrones(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDrones();
  }, []);

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={globalStyles.container}>
        <Text>Erro ao carregar drones.</Text>
      </View>
    );
  }

  if (drones.length === 0) {
    return (
      <View style={globalStyles.container}>
        <Text>Nenhum drone encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Drones</Text>
      <FlatList
        data={drones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={styles.name}>{item.nome}</Text>
            <Text>ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
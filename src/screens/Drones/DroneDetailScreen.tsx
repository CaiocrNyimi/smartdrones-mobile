import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DroneDetailScreen({ route }: any) {
  const { drone } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Drone</Text>
      <Text style={styles.label}>Modelo:</Text>
      <Text>{drone.modelo}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text>{drone.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});

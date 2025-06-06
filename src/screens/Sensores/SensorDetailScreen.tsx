import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SensorDetailScreen({ route }: any) {
  const { sensor } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID:</Text>
      <Text>{sensor.id}</Text>
      <Text style={styles.label}>Tipo:</Text>
      <Text>{sensor.tipo}</Text>
      <Text style={styles.label}>Unidade:</Text>
      <Text>{sensor.unidade}</Text>
      <Text style={styles.label}>Drone:</Text>
      <Text>{sensor.drone?.modelo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
  },
});
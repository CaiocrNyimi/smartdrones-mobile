import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LeituraDetailScreen({ route }: any) {
  const { leitura } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID:</Text>
      <Text>{leitura.id}</Text>
      <Text style={styles.label}>Valor:</Text>
      <Text>{leitura.valor}</Text>
      <Text style={styles.label}>Unidade:</Text>
      <Text>{leitura.unidade}</Text>
      <Text style={styles.label}>Sensor ID:</Text>
      <Text>{leitura.sensor?.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
  },
});

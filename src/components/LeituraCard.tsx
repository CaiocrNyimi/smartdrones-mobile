import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface LeituraCardProps {
  leitura: {
    id: number;
    valor: number;
    timestamp: string;
    sensor_id: number;
  };
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const LeituraCard: React.FC<LeituraCardProps> = ({ leitura, onView, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Valor: {leitura.valor}</Text>
      <Text>Data: {new Date(leitura.timestamp).toLocaleString()}</Text>
      <Text>Sensor ID: {leitura.sensor_id}</Text>
      <View style={styles.buttons}>
        <Button title="Ver" onPress={() => onView(leitura.id)} />
        <Button title="Editar" onPress={() => onEdit(leitura.id)} />
        <Button title="Excluir" onPress={() => onDelete(leitura.id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default LeituraCard;
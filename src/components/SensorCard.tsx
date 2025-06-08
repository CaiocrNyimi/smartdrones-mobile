import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface SensorCardProps {
  sensor: {
    id: number;
    tipo: string;
    droneId: number;
  };
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensor, onView, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tipo: {sensor.tipo}</Text>
      <Text>Drone ID: {sensor.droneId}</Text>
      <View style={styles.buttons}>
        <Button title="Ver" onPress={() => onView(sensor.id)} />
        <Button title="Editar" onPress={() => onEdit(sensor.id)} />
        <Button title="Excluir" onPress={() => onDelete(sensor.id)} />
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

export default SensorCard;
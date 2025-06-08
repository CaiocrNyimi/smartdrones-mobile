import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface DroneCardProps {
  drone: {
    id: number;
    modelo: string;
    status: string;
  };
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const DroneCard: React.FC<DroneCardProps> = ({ drone, onView, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Modelo: {drone.modelo}</Text>
      <Text>Status: {drone.status}</Text>
      <View style={styles.buttons}>
        <Button title="Ver" onPress={() => onView(drone.id)} />
        <Button title="Editar" onPress={() => onEdit(drone.id)} />
        <Button title="Excluir" onPress={() => onDelete(drone.id)} />
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

export default DroneCard;
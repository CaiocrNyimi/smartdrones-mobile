import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Drone } from '../data/dummyData';
import { globalStyles } from '../styles/globalStyles';
import { Colors } from '../constants/Colors';
import CustomButton from './CustomButton';

interface DroneCardProps {
  drone: Drone;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const DroneCard: React.FC<DroneCardProps> = ({ drone, onView, onEdit, onDelete }) => {
  return (
    <TouchableOpacity style={globalStyles.card} onPress={() => onView(drone.drone_id)}>
      <Text style={styles.title}>{drone.modelo}</Text>
      <Text style={styles.detail}>ID: {drone.drone_id}</Text>
      <Text style={styles.detail}>Status: <Text style={[
        styles.statusText,
        drone.status === 'Ativo' && styles.statusActive,
        drone.status === 'Manutenção' && styles.statusMaintenance,
        drone.status === 'Desativado' && styles.statusInactive,
      ]}>{drone.status}</Text></Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Editar"
          onPress={() => onEdit(drone.drone_id)}
          style={styles.actionButton}
          buttonType="info"
        />
        <CustomButton
          title="Excluir"
          onPress={() => onDelete(drone.drone_id)}
          style={styles.actionButton}
          buttonType="danger"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.text,
  },
  detail: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 3,
  },
  statusText: {
    fontWeight: 'bold',
  },
  statusActive: {
    color: Colors.primaryDark,
  },
  statusMaintenance: {
    color: Colors.accent,
  },
  statusInactive: {
    color: Colors.danger,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
  },
});

export default DroneCard;
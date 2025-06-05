import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sensor } from '../data/dummyData';
import { globalStyles } from '../styles/globalStyles';
import { Colors } from '../constants/Colors';
import CustomButton from './CustomButton';

interface SensorCardProps {
  sensor: Sensor;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensor, onView, onEdit, onDelete }) => {
  return (
    <TouchableOpacity style={globalStyles.card} onPress={() => onView(sensor.sensor_id)}>
      <Text style={styles.title}>{sensor.tipo}</Text>
      <Text style={styles.detail}>ID: {sensor.sensor_id}</Text>
      <Text style={styles.detail}>Drone ID Associado: {sensor.drone_id}</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Editar"
          onPress={() => onEdit(sensor.sensor_id)}
          style={styles.actionButton}
          buttonType="info"
        />
        <CustomButton
          title="Excluir"
          onPress={() => onDelete(sensor.sensor_id)}
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

export default SensorCard;
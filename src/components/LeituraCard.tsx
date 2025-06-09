import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LeituraSensor } from '../models/LeituraSensor';
import { Colors } from '../constants/Colors';

interface Props {
  leitura: LeituraSensor;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const LeituraCard = ({ leitura, onView, onEdit, onDelete }: Props) => {
  const date = new Date(leitura.timestamp);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Valor: {leitura.valor}</Text>
      <Text style={styles.subtitle}>Sensor ID: {leitura.sensorId}</Text>
      <Text style={styles.subtitle}>Data: {date.toLocaleString()}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onView(leitura.id)}>
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onEdit(leitura.id)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dangerButton} onPress={() => onDelete(leitura.id)}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  dangerButton: {
    backgroundColor: Colors.danger,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LeituraCard;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LeituraSensor } from '../data/dummyData';
import { globalStyles } from '../styles/globalStyles';
import { Colors } from '../constants/Colors';
import CustomButton from './CustomButton';

interface LeituraCardProps {
  leitura: LeituraSensor;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const LeituraCard: React.FC<LeituraCardProps> = ({ leitura, onView, onEdit, onDelete }) => {
  const formattedTimestamp = leitura.timestamp.toLocaleString();

  return (
    <TouchableOpacity style={globalStyles.card} onPress={() => onView(leitura.leitura_id)}>
      <Text style={styles.title}>Leitura ID: {leitura.leitura_id}</Text>
      <Text style={styles.detail}>Sensor ID: {leitura.sensor_id}</Text>
      <Text style={styles.detail}>Valor: {leitura.valor}</Text>
      <Text style={styles.detail}>Data/Hora: {formattedTimestamp}</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Editar"
          onPress={() => onEdit(leitura.leitura_id)}
          style={styles.actionButton}
          buttonType="info"
        />
        <CustomButton
          title="Excluir"
          onPress={() => onDelete(leitura.leitura_id)}
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

export default LeituraCard;
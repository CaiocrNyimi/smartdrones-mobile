import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { globalStyles } from '../../styles/globalStyles';

import { Sensor } from '../../models/Sensor';

type SensorDetailRouteProp = RouteProp<RootStackParamList, 'SensorDetail'>;

const SensorDetailScreen = () => {
  const route = useRoute<SensorDetailRouteProp>();
  const { sensor } = route.params;

  if (!sensor) {
    return (
      <View style={globalStyles.container}>
        <Text>Sensor não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Tipo: {sensor.tipo}</Text>
      <Text>Drone ID: {sensor.drone?.id ?? 'N/A'}</Text>
    </View>
  );
};

export default SensorDetailScreen;
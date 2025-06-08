import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { globalStyles } from '../../styles/globalStyles';

type DroneDetailRouteProp = RouteProp<RootStackParamList, 'DroneDetail'>;

const DroneDetailScreen = () => {
  const route = useRoute<DroneDetailRouteProp>();
  const { drone } = route.params;

  if (!drone) {
    return (
      <View style={globalStyles.container}>
        <Text>Drone não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Modelo: {drone.modelo}</Text>
      <Text>Status: {drone.status}</Text>
    </View>
  );
};

export default DroneDetailScreen;
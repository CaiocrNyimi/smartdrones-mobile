import React from 'react';
import { View, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { globalStyles } from '../../styles/globalStyles';
import { RootStackParamList } from '../../navigation/AppNavigator';

const LeituraDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'LeituraDetail'>>();
  const { leitura } = route.params;

  if (!leitura) {
    return (
      <View style={globalStyles.container}>
        <Text>Leitura não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Valor: {leitura.valor}</Text>
      <Text>Sensor ID: {leitura.sensorId}</Text>
      <Text>Timestamp: {new Date(leitura.timestamp).toLocaleString()}</Text>
    </View>
  );
};

export default LeituraDetailScreen;
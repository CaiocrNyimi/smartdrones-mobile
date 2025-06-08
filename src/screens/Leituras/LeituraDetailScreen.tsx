import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import LeituraService from '../../services/leituraService';
import { globalStyles } from '../../styles/globalStyles';

const LeituraDetailsScreen = () => {
  const route = useRoute<RouteProp<{ params: { id: number } }, 'params'>>();
  const { id } = route.params;
  const [leitura, setLeitura] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LeituraService.getById(id).then(setLeitura).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={globalStyles.container}>
      <Text>Valor: {leitura.valor}</Text>
      <Text>Timestamp: {new Date(leitura.timestamp).toLocaleString()}</Text>
      <Text>Sensor ID: {leitura.sensor?.id}</Text>
    </View>
  );
};

export default LeituraDetailsScreen;
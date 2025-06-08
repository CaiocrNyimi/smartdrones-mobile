import React, { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import LeituraService from '../../services/leituraService';
import { globalStyles } from '../../styles/globalStyles';

const ManageLeituraScreen = () => {
  const route = useRoute<RouteProp<{ params: { id?: number } }, 'params'>>();
  const navigation = useNavigation();
  const { id } = route.params || {};
  const [valor, setValor] = useState('');
  const [sensorId, setSensorId] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    if (id) {
      LeituraService.getById(id).then((leitura) => {
        setValor(leitura.valor.toString());
        setSensorId(leitura.sensor?.id?.toString() || '');
        setTimestamp(leitura.timestamp);
      });
    }
  }, [id]);

  const handleSubmit = async () => {
    const data = {
      valor: Number(valor),
      timestamp,
      sensor: { id: Number(sensorId) },
    };
    if (id) {
      await LeituraService.update(id, data);
    } else {
      await LeituraService.create(data);
    }
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <TextInput value={valor} onChangeText={setValor} placeholder="Valor" keyboardType="numeric" />
      <TextInput value={timestamp} onChangeText={setTimestamp} placeholder="Timestamp" />
      <TextInput value={sensorId} onChangeText={setSensorId} placeholder="Sensor ID" keyboardType="numeric" />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default ManageLeituraScreen;
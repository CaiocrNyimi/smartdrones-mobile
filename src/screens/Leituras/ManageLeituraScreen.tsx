import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { LeituraSensor, Sensor } from '../../data/dummyData';
import { fetchLeituraById, addLeitura, modifyLeitura, fetchSensores } from '../../services/apiService';
import { globalStyles } from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../constants/Colors';

type ManageLeituraScreenRouteProp = RouteProp<RootStackParamList, 'ManageLeitura'>;
type ManageLeituraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ManageLeitura'>;

interface ManageLeituraScreenProps {
  route: ManageLeituraScreenRouteProp;
  navigation: ManageLeituraScreenNavigationProp;
}

const ManageLeituraScreen: React.FC<ManageLeituraScreenProps> = ({ route, navigation }) => {
  const { leituraId } = route.params || {};
  const [sensorId, setSensorId] = useState<number | undefined>(undefined);
  const [valor, setValor] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [availableSensores, setAvailableSensores] = useState<Sensor[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const sensores = await fetchSensores();
        setAvailableSensores(sensores);

        if (leituraId) {
          setIsEditing(true);
          const leitura = await fetchLeituraById(leituraId);
          if (leitura) {
            setSensorId(leitura.sensor_id);
            setValor(leitura.valor.toString());
          } else {
            Alert.alert('Erro', 'Leitura não encontrada.');
            navigation.goBack();
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados para o formulário da leitura:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [leituraId, navigation]);

  const handleSave = async () => {
    if (sensorId === undefined || !valor.trim()) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    const parsedValor = parseFloat(valor);
    if (isNaN(parsedValor)) {
      Alert.alert('Erro', 'O valor da leitura deve ser um número válido.');
      return;
    }

    setLoading(true);
    try {
      if (isEditing && leituraId) {
        const updatedLeitura: LeituraSensor = { leitura_id: leituraId, sensor_id: sensorId, valor: parsedValor, timestamp: new Date() };
        await modifyLeitura(updatedLeitura);
        Alert.alert('Sucesso', 'Leitura atualizada com sucesso!');
      } else {
        const newLeitura: Omit<LeituraSensor, 'leitura_id' | 'timestamp'> = { sensor_id: sensorId, valor: parsedValor };
        await addLeitura(newLeitura);
        Alert.alert('Sucesso', 'Leitura adicionada com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar leitura:', error);
      Alert.alert('Erro', 'Não foi possível salvar a leitura.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={globalStyles.container}>
        <Text style={globalStyles.subtitle}>
          {isEditing ? 'Editar Leitura' : 'Adicionar Nova Leitura'}
        </Text>

        <Text style={globalStyles.textInputLabel}>Sensor:</Text>
        <View style={globalStyles.picker}>
          <Picker
            selectedValue={sensorId}
            onValueChange={(itemValue: number) => setSensorId(itemValue)}
            style={globalStyles.pickerItem}
          >
            <Picker.Item label="Selecione um Sensor" value={undefined} />
            {availableSensores.map(sensor => (
              <Picker.Item key={sensor.sensor_id} label={`${sensor.tipo} (ID: ${sensor.sensor_id})`} value={sensor.sensor_id} />
            ))}
          </Picker>
        </View>

        <Text style={globalStyles.textInputLabel}>Valor:</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Digite o valor da leitura"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <CustomButton
          title={isEditing ? 'Salvar Alterações' : 'Adicionar Leitura'}
          onPress={handleSave}
          disabled={loading}
        />
        {loading && <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    marginTop: 10,
  },
});

export default ManageLeituraScreen;
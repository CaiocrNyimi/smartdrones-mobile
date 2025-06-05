import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { LeituraSensor } from '../../data/dummyData';
import { fetchLeituras, removeLeitura } from '../../services/apiService';
import { globalStyles } from '../../styles/globalStyles';
import LeituraCard from '../../components/LeituraCard';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../constants/Colors';

type LeiturasScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Leituras'>;

interface LeiturasScreenProps {
  navigation: LeiturasScreenNavigationProp;
}

const LeiturasScreen: React.FC<LeiturasScreenProps> = ({ navigation }) => {
  const [leituras, setLeituras] = useState<LeituraSensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadLeituras = async () => {
    setLoading(true);
    try {
      const fetchedLeituras = await fetchLeituras();
      setLeituras(fetchedLeituras);
    } catch (error) {
      console.error('Erro ao carregar leituras:', error);
      Alert.alert('Erro', 'Não foi possível carregar as leituras.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadLeituras();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadLeituras();
  };

  const handleDeleteLeitura = async (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta leitura?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const success = await removeLeitura(id);
              if (success) {
                Alert.alert('Sucesso', 'Leitura excluída com sucesso.');
                loadLeituras();
              } else {
                Alert.alert('Erro', 'Não foi possível excluir a leitura.');
              }
            } catch (error) {
              console.error('Erro ao excluir leitura:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao excluir a leitura.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando Leituras...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subtitle}>Leituras de Sensores</Text>
      <CustomButton
        title="Adicionar Nova Leitura"
        onPress={() => navigation.navigate('ManageLeitura', { leituraId: undefined })}
      />
      {leituras.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma leitura cadastrada.</Text>
      ) : (
        <FlatList
          data={leituras}
          keyExtractor={(item) => item.leitura_id.toString()}
          renderItem={({ item }) => (
            <LeituraCard
              leitura={item}
              onView={(id) => navigation.navigate('LeituraDetail', { leituraId: id })}
              onEdit={(id) => navigation.navigate('ManageLeitura', { leituraId: id })}
              onDelete={handleDeleteLeitura}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[Colors.primary]}
            />
          }
        />
      )}
    </View>
  );
};

export default LeiturasScreen;
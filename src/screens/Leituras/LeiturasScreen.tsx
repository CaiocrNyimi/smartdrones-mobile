import React, { useState, useCallback } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LeituraService from '../../services/leituraService';
import LeituraCard from '../../components/LeituraCard';
import { globalStyles } from '../../styles/globalStyles';
import { LeituraSensor } from '../../models/LeituraSensor';
import { NavigationProps } from '../../types/navigation';

const LeiturasScreen = () => {
  const [leituras, setLeituras] = useState<LeituraSensor[]>([]);
  const navigation = useNavigation<NavigationProps>();

  const fetchLeituras = async () => {
    try {
      const data = await LeituraService.getAll();
      setLeituras(data);
    } catch (error) {
      console.error('Erro ao buscar leituras:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLeituras();
    }, [])
  );

  const handleView = (id: number) => {
    const leitura = leituras.find((l) => l.id === id);
    if (leitura) navigation.navigate('LeituraDetail', { leitura });
  };

  const handleEdit = (id: number) => {
    const leitura = leituras.find((l) => l.id === id);
    if (leitura) navigation.navigate('ManageLeitura', { leitura });
  };

  const handleDelete = async (id: number) => {
    try {
      const success = await LeituraService.delete(id);
      if (success) {
        await fetchLeituras();
      } else {
        alert('Erro ao deletar leitura.');
      }
    } catch (error) {
      console.error('Erro ao deletar leitura:', error);
      alert('Erro interno ao deletar a leitura. Veja o console para detalhes.');
    }
  };

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('ManageLeitura', {})}
      >
        <Text style={globalStyles.buttonText}>Nova Leitura</Text>
      </TouchableOpacity>
      {leituras?.map((leitura) => (
        <LeituraCard
          key={leitura.id}
          leitura={leitura}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </ScrollView>
  );
};

export default LeiturasScreen;
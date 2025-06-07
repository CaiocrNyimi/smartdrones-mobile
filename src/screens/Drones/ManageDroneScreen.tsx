import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { fetchDrones } from '../../services/droneService';
import { getProfile } from '../../services/userService';

export default function ManageDronesScreen() {
  const [drones, setDrones] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getProfile()
      .then(user => setIsAdmin(user.role === 'ADMIN'))
      .catch(console.error);
    fetchDrones().then(setDrones);
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert('Excluir Drone', `Tem certeza que deseja excluir o drone ${id}?`, [
      { text: 'Cancelar' },
      { text: 'Excluir', onPress: () => console.log('Excluir drone', id) },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={drones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.droneItem}>
            <Text style={styles.label}>Modelo:</Text>
            <Text>{item.modelo}</Text>
            <Text style={styles.label}>Status:</Text>
            <Text>{item.status}</Text>
            {isAdmin && (
              <Button title="Excluir" onPress={() => handleDelete(item.id)} />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  droneItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
  },
});
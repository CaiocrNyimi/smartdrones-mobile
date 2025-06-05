import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { globalStyles } from '../styles/globalStyles';
import CustomButton from '../components/CustomButton';
import { Colors } from '../constants/Colors';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Bem-vindo ao Drone Monitoring App!</Text>

        <Text style={styles.description}>
          Gerencie drones, sensores e suas leituras em tempo real.
          Monitore o status dos seus equipamentos e visualize dados importantes
          para otimizar suas operações.
        </Text>

        <CustomButton
          title="Gerenciar Drones"
          onPress={() => navigation.navigate('Drones')}
          style={styles.navButton}
        />
        <CustomButton
          title="Gerenciar Sensores"
          onPress={() => navigation.navigate('Sensores')}
          style={styles.navButton}
        />
        <CustomButton
          title="Ver Leituras de Sensores"
          onPress={() => navigation.navigate('Leituras')}
          style={styles.navButton}
        />
        <CustomButton
          title="Dashboard de Estatísticas"
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.navButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: Colors.text,
    lineHeight: 25,
  },
  navButton: {
    marginBottom: 15,
  },
});

export default HomeScreen;
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { globalStyles } from '../styles/globalStyles';
import CustomButton from '../components/CustomButton';
import { Colors } from '../constants/Colors';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: any;
  setIsLoggedIn: (value: boolean) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, setIsLoggedIn }) => {
  const handleLogout = async () => {
    setIsLoggedIn(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Bem-vindo ao SmartDrones</Text>
        <Image source={require('@/assets/smartdrones-logo.png')} style={styles.logo} />
        <Text style={styles.description}>
          Gerencie drones, sensores e suas leituras em tempo real.
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
        <CustomButton
          title="Sair"
          onPress={handleLogout}
          style={styles.logoutButton}
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
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 24,
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
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#ff4d4d',
  },
});

export default HomeScreen;

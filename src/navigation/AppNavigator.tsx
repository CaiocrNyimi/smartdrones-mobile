import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DronesScreen from '../screens/Drones/DronesScreen';
import ManageDroneScreen from '../screens/Drones/ManageDroneScreen';
import SensoresScreen from '../screens/Sensores/SensoresScreen';
import ManageSensorScreen from '../screens/Sensores/ManageSensorScreen';
import LeiturasScreen from '../screens/Leituras/LeiturasScreen';
import ManageLeituraScreen from '../screens/Leituras/ManageLeituraScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DroneDetailScreen from '../screens/Drones/DroneDetailScreen';
import SensorDetailScreen from '../screens/Sensores/SensorDetailScreen';
import LeituraDetailScreen from '../screens/Leituras/LeiturasDetailScreen';
import { Colors } from '../constants/Colors';

export type RootStackParamList = {
  Home: undefined;
  Drones: undefined;
  ManageDrone: { droneId?: number } | undefined;
  DroneDetail: { droneId: number };
  Sensores: undefined;
  ManageSensor: { sensorId?: number } | undefined;
  SensorDetail: { sensorId: number };
  Leituras: undefined;
  ManageLeitura: { leituraId?: number } | undefined;
  LeituraDetail: { leituraId: number };
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type AppNavigatorProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const AppNavigator: React.FC<AppNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        options={{ title: '' }}
      >
        {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen
        name="Drones"
        component={DronesScreen}
        options={{ title: 'Drones' }}
      />
      <Stack.Screen
        name="ManageDrone"
        component={ManageDroneScreen}
        options={({ route }) => ({
          title: route.params?.droneId ? 'Editar Drone' : 'Adicionar Drone',
        })}
      />
      <Stack.Screen
        name="DroneDetail"
        component={DroneDetailScreen}
        options={{ title: 'Detalhes do Drone' }}
      />
      <Stack.Screen
        name="Sensores"
        component={SensoresScreen}
        options={{ title: 'Sensores' }}
      />
      <Stack.Screen
        name="ManageSensor"
        component={ManageSensorScreen}
        options={({ route }) => ({
          title: route.params?.sensorId ? 'Editar Sensor' : 'Adicionar Sensor',
        })}
      />
      <Stack.Screen
        name="SensorDetail"
        component={SensorDetailScreen}
        options={{ title: 'Detalhes do Sensor' }}
      />
      <Stack.Screen
        name="Leituras"
        component={LeiturasScreen}
        options={{ title: 'Leituras de Sensores' }}
      />
      <Stack.Screen
        name="ManageLeitura"
        component={ManageLeituraScreen}
        options={({ route }) => ({
          title: route.params?.leituraId ? 'Editar Leitura' : 'Adicionar Leitura',
        })}
      />
      <Stack.Screen
        name="LeituraDetail"
        component={LeituraDetailScreen}
        options={{ title: 'Detalhes da Leitura' }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
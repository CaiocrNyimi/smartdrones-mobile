import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DronesScreen from '../screens/Drones/DronesScreen';
import DroneDetailScreen from '../screens/Drones/DroneDetailScreen';
import ManageDroneScreen from '../screens/Drones/ManageDroneScreen';

import SensoresScreen from '../screens/Sensores/SensoresScreen';
import SensorDetailScreen from '../screens/Sensores/SensorDetailScreen';
import ManageSensorScreen from '../screens/Sensores/ManageSensorScreen';

import LeiturasScreen from '../screens/Leituras/LeiturasScreen';
import LeituraDetailScreen from '../screens/Leituras/LeituraDetailScreen';
import ManageLeituraScreen from '../screens/Leituras/ManageLeituraScreen';

import DashboardScreen from '../screens/DashboardScreen'; // ADICIONE ISSO

export type RootStackParamList = {
  Home: undefined;
  Drones: undefined;
  DroneDetail: { drone: any };
  ManageDrone: { drone?: any };
  Sensores: undefined;
  SensorDetail: { sensor: any };
  ManageSensor: { sensor?: any };
  Leituras: undefined;
  LeituraDetail: { leitura: any };
  ManageLeitura: { leitura?: any };
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type AppNavigatorProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export default function AppNavigator({ setIsLoggedIn }: AppNavigatorProps) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home">
        {props => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Drones" component={DronesScreen} />
      <Stack.Screen name="DroneDetail" component={DroneDetailScreen} />
      <Stack.Screen name="ManageDrone" component={ManageDroneScreen} />
      <Stack.Screen name="Sensores" component={SensoresScreen} />
      <Stack.Screen name="SensorDetail" component={SensorDetailScreen} />
      <Stack.Screen name="ManageSensor" component={ManageSensorScreen} />
      <Stack.Screen name="Leituras" component={LeiturasScreen} />
      <Stack.Screen name="LeituraDetail" component={LeituraDetailScreen} />
      <Stack.Screen name="ManageLeitura" component={ManageLeituraScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}

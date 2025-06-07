import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

type AuthNavigatorProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ setIsLoggedIn }) => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login">
      {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
    <Stack.Screen name="Register">
      {props => <RegisterScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AuthNavigator;

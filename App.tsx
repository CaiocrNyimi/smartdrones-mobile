import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);

  return (
    <NavigationContainer>
      <RootNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </NavigationContainer>
  );
}
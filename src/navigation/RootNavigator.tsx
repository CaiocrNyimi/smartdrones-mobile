import React from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

type RootNavigatorProps = {
  isLoggedIn: boolean | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const RootNavigator: React.FC<RootNavigatorProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  return isLoggedIn
    ? <AppNavigator setIsLoggedIn={setIsLoggedIn} />
    : <AuthNavigator setIsLoggedIn={setIsLoggedIn} />;
};

export default RootNavigator;
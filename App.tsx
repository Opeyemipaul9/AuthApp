import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/auth.context';
import { RootNavigator } from './src/Navigation';

 const App = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0c0e14" />
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;

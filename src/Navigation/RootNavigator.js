import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from '../theme';
import { AppNavigator } from './appNavigator';
import { AuthNavigator } from './authNavigator';
import { useAuth } from '../context/AuthContext';

export const RootNavigator = () => {
  const { status } = useAuth();
  if (status === 'loading' || status === 'idle') {
    return (
      <View style={styles.loadding}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {status === 'authenticated' ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadding: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgBase,
  },
});

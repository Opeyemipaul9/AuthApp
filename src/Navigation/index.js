import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/auth.context';
import loginscreen from '../screens/loginscreen';
import SignUpScreen from '../screens/Signup.screen';
import HomeScreen from '../screens/Home.screen';
import { Colors } from '../theme';

const AuthStack = createNativeStackNavigator();
const Appstack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={loginscreen} />
      <AuthStack.Screen
        name="signup"
        component={SignUpScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </AuthStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Appstack.Navigator screenOptions={{ headerShown: false }}>
      <Appstack.Screen name="Home" component={HomeScreen} />
    </Appstack.Navigator>
  );
};

const SplashScreen = () => {
  return (
    <View style={styles.splash}>
      <ActivityIndicator color={Colors.accent} size="large" />
    </View>
  );
};

export const RootNavigator = () => {
  const { status } = useAuth();

  return (
    <NavigationContainer>
      {status === 'idle' && <SplashScreen />}
      {status === 'authenticated' && <AppNavigator />}
      {(status === 'unauthenticated' || status === 'loading') && (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: Colors.bgBase,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

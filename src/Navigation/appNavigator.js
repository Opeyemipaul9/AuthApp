import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home.screen';
import Loginscreen from '../screens/loginscreen';
import SignUpScreen from '../screens/Signup.screen';
import WelcomeScreen from '../screens/Welcome.screen';
import { Colors } from '../theme';
import {AppstackParamList} from './type'


const Stack = createNativeStackNavigator<AppstackParamList>();

export const AppNavigator = () => {
  // const { user } = useAuth();
  // if (user) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.bgBase },
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          components={HomeScreen}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
          components={loginscreen}
        />
        <Stack.Screen
          name="signup"
          options={{ headerShown: false }}
          components={SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

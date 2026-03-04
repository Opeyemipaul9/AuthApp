import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loginscreen from '../screens/loginscreen';
import SignUpScreen from '../screens/Signup.screen';
import { Colors } from '../theme';
import {AuthstackParamList} from './type'

const Stack = createNativeStackNavigator<AuthstackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.bgBase },
        animation: 'slide_from_right',
        animationDuration: 280,
      }}
    >
      <Stack.Screen name="login" component={loginscreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

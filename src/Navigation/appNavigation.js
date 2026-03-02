import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStaticNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home.screen';
import loginscreen from '../screens/loginscreen';
import SignUpScreen from '../screens/Signup.screen';
import WelcomeScreen from '../screens/Welcome.screen';


const Stack = createNativeStaticNavigator();


export  const AppNavigator = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigtor initialRouteName ='welcome'>
                <Stack.screen name='Home' options={{headerShown:false}} components ={HomeScreen}/>
                <Stack.screen name='welcome' options={{headerShown:false}} components ={WelcomeScreen}/>
                <Stack.screen name='login' options={{headerShown:false}} components ={loginscreen}/>
                <Stack.screen name='signup' options={{headerShown:false}} components ={SignUpScreen}/>
            </Stack.Navigtor>
        </NavigationContainer>

    )
}
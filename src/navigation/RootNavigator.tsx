import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { RootStackParamList } from './types';
import CWSplashScreen from '../views/AuthOnboarding/CWSPlashScree';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    
  return (
    <Stack.Navigator
      initialRouteName="CWSplashScreen"
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen name="CWSplashScreen" component={CWSplashScreen} />
      <Stack.Screen name="MainStack" component={MainStackNavigator} />
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

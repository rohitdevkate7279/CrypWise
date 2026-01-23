import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CWLoginScreen from '../screens/CWLoginScreen';
import CWIntroScreen from '../views/AuthOnboarding/CWIntroScreen';

export type AuthStackParamList = {
  CWLogin: undefined;
  CWSignUp: undefined;
  CWSplashScreen: {prop:any}
  CWIntroScreen: undefined
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const CWAuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="CWLogin"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >

      <AuthStack.Screen name="CWLogin" component={CWLoginScreen} />
      <AuthStack.Screen name="CWIntroScreen" component={CWIntroScreen} />
    </AuthStack.Navigator>
  );
};

export default CWAuthStackNavigator;

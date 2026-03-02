import React from 'react';
import CWLoginScreen from '../views/AuthOnboarding/CWLoginScreen';
import CWIntroScreen from '../views/AuthOnboarding/CWIntroScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStackData } from './CWNavGraph';
import { AppScreens } from '../CWUtilities/CWConstants';
import CWLoginOTPScreen from '../views/AuthOnboarding/CWLoginOTPScreen';

const AuthStack = createNativeStackNavigator<NavigationStackData>();

const CWAuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="CWIntroScreen"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >

      <AuthStack.Screen name= {AppScreens.LOGIN_SCREEN} component={CWLoginScreen} />
      <AuthStack.Screen name= {AppScreens.INTROSCREEN} component={CWIntroScreen} />
      <AuthStack.Screen name = { AppScreens.LOGIN_OTP_SCREEN} component={CWLoginOTPScreen}/>
    </AuthStack.Navigator>
  );
};

export default CWAuthStackNavigator;

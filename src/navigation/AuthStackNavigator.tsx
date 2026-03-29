import React, { Component } from 'react';
import CWLoginScreen from '../views/AuthOnboarding/Login/CWLoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStackData } from './CWNavGraph';
import { AppScreens } from '../CWUtilities/CWConstants';
import CWLoginOTPScreen from '../views/AuthOnboarding/Login/CWLoginOTPScreen';
import CWBiometric from '../views/AuthOnboarding/Login/Biometric/CWBiometric';
import CWMpinScreen from '../views/AuthOnboarding/Login/CWMpinScreen';
import CWConfirmMpinScreen from '../views/AuthOnboarding/Login/CWConfirmMpinScreen';
import CWIntroScreen from '../views/AuthOnboarding/Login/CWIntroScreen';

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
      <AuthStack.Screen name ={ AppScreens.BIOMETRIC_SCREEN } component={CWBiometric}/>
      <AuthStack.Screen name ={ AppScreens.MPIN_SCREEN } component={CWMpinScreen}/>
      <AuthStack.Screen name ={ AppScreens.CONFIRM_MPIN_SCREEN } component={CWConfirmMpinScreen}/>

    </AuthStack.Navigator>
  );
};

export default CWAuthStackNavigator;

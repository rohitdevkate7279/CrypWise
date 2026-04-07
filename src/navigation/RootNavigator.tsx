import React, { useEffect } from 'react';
import { NavigationStackData } from './CWNavGraph';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppScreens } from '../CWUtilities/CWConstants';
import CWAuthStackNavigator from './AuthStackNavigator';
import CWMainStackNavigator from './MainStackNavigator';
import CWSplashScreen from '../views/AuthOnboarding/Login/CWSplashScreen/CWSplashScreen';

const Stack = createNativeStackNavigator<NavigationStackData>();

const RootNavigator = ({deeplink}:{deeplink:string|null}) => {
    
  return (
    <Stack.Navigator
      initialRouteName={AppScreens.SPLASHSCREEN}
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen name= {AppScreens.SPLASHSCREEN} component={CWSplashScreen} />
      <Stack.Screen name={AppScreens.MAINSTACK} component={CWMainStackNavigator} />
      <Stack.Screen name={AppScreens.AUTHSTACK} component={CWAuthStackNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

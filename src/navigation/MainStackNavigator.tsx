import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CWDummyScreen from '../CWDummyScreen';
import CWHomeScreen from '../screens/CWHomeScreen';
import CWProfileScreen from '../screens/CWProfileScreen';

export type MainStackParamList = {
  CWHome: undefined;
  CWProfile: undefined;
  CWDummyScreen: undefined;
};

const CWMainStack = createStackNavigator<MainStackParamList>();

const CWMainStackNavigator = () => {
  useEffect(()=>{
    
    },[])
  
  return (
    <CWMainStack.Navigator
      initialRouteName="CWHome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <CWMainStack.Screen name="CWHome" component={CWHomeScreen} />
      <CWMainStack.Screen name="CWProfile" component={CWProfileScreen} />
      <CWMainStack.Screen name="CWDummyScreen" component={CWDummyScreen} />
    </CWMainStack.Navigator>
  );
};

export default CWMainStackNavigator;

import React, { useEffect } from 'react';
import CWDummyScreen from '../CWDummyScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type MainStackParamList = {
  CWHome: undefined;
  CWProfile: undefined;
  CWDummyScreen: undefined;
};

const CWMainStack = createNativeStackNavigator<MainStackParamList>();

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
      <CWMainStack.Screen name="CWDummyScreen" component={CWDummyScreen} />
    </CWMainStack.Navigator>
  );
};

export default CWMainStackNavigator;

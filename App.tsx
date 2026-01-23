import { StatusBar, useColorScheme, View } from 'react-native';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomTokenProvider } from './src/theme/CWCustomTokenProvider';
import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = createNavigationContainerRef();
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CustomTokenProvider
        value={{
          primary: 'purple',
          mode: isDarkMode ? "dark" : "dark",
        }}
      >
        <NavigationContainer ref={navigationRef}
        >
          <RootNavigator />
        </NavigationContainer>
      </CustomTokenProvider>
    </SafeAreaProvider>
  );
}

export default App;

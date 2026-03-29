import { Linking, StatusBar, useColorScheme, View } from 'react-native';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomTokenProvider } from './src/theme/CWCustomTokenProvider';
import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { CWSharedViewModel } from './src/CWUtilities/CWSharedViewModel';
import { GlobalStateProvider } from './src/CWUtilities/CWGlobalStateProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = createNavigationContainerRef();


  useEffect(() => {
    console.log('[App] Component mounted');
    const getInitialURL = async () => {
      const url = await Linking.getInitialURL();
      console.log('[App] Initial URL:', url);

      if (url) {
        CWSharedViewModel.Instance.setDeeplinkUrlData(url)
      }
    };

    getInitialURL();

    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('[App] URL event received:', url);
      CWSharedViewModel.Instance.setDeeplinkUrlData(url)
    });

    return () => {
      console.log('[App] Component unmounting');
      subscription.remove();
    };
  }, []);


  // networkService.startMonitoring();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CustomTokenProvider
        value={{
          primary: 'purple',
          mode: isDarkMode ? "dark" : "dark",
        }}
      >
        <GlobalStateProvider>
          <NavigationContainer ref={navigationRef}>
            <RootNavigator deeplink={null} />
          </NavigationContainer>
        </GlobalStateProvider>
      </CustomTokenProvider>
    </SafeAreaProvider>
  );
}

export default App;

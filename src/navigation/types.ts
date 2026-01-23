import { NavigatorScreenParams } from '@react-navigation/native';
import { MainStackParamList } from './MainStackNavigator';
import { AuthStackParamList } from './AuthStackNavigator';

export type RootStackParamList = {
  CWSplashScreen: { props: any };
  MainStack: NavigatorScreenParams<MainStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
};

// Re-export for convenience
export type { MainStackParamList } from './MainStackNavigator';
export type { AuthStackParamList } from './AuthStackNavigator';

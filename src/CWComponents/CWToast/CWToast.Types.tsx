import { StyleProp, ViewStyle } from "react-native";

export interface CWToastProps {
  isVisible: boolean;
  message?: string;
  subTitle?: string;
  semanticState?: SchematicState;
  duration?: Duration;
  showClose?: boolean;
  type?: ToastType;
  offset?: number;
  style?: StyleProp<ViewStyle>;
  maxLines?: number;
  onDismiss?: () => void;
}
export enum SchematicState{
  SUCCESS  = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}
export enum Duration{
  SHORT='short',
  MEDIUM='medium',
  LONG='long',
  PERSIST='persist',
}
export enum ToastType{
  SCHEMATIC='schematic',
  SPINNER='spinner',
  NONE='none',
}
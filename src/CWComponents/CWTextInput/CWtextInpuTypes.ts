import { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { FeedbackState } from './CWfeedback';

export interface CWTextInputProps {
  numberOfDigits?: number;
  inputContainer?: ViewStyle;
  autoFocus?: boolean;
  autoOtp?:string;
  onTextChange?: (text: string) => void;
  onFilled?: (text: string) => void;
  hideStick?: boolean;
  onResend?:boolean;
  focusStickBlinkingDuration?: number;
  secureTextEntry?: boolean;
  theme?: Theme;
  disabled?: boolean;
  textInputProps?: TextInputProps;
  state?: FeedbackState;
  stateMessage?: string;
  gap?:number;
  placeholder?:string|undefined;
  mainContainerStyle?:ViewStyle;
  clearText?:boolean;
  preventKeyboard?: boolean;
}

export interface CWTextInputRef {
  clear: () => void;
  focus: () => void;
  setValue: (value: string) => void;
}

export interface Theme {
  containerStyle?: ViewStyle;
  inputsContainerStyle?: ViewStyle;
  pinCodeContainerStyle?: ViewStyle;
  filledPinCodeContainerStyle?: ViewStyle;
  pinCodeTextStyle?: TextStyle;
  focusStickStyle?: ViewStyle;
  focusedPinCodeContainerStyle?: ViewStyle;
  disabledPinCodeContainerStyle?: ViewStyle;
}

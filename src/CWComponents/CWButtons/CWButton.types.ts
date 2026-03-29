import { StyleProp, ViewStyle } from "react-native";

export enum CWButtonVariant {
  GRADIENT = "gradient",
  SOLID = "solid",
}

export enum CWButtonSize {
  MEDIUM = "medium", // 48px (primary CTA)
  SMALL = "small",
  LARGE = "large"

}

export enum CWButtonState {
  NORMAL = "normal",
  LOADING = "loading",
  DISABLED = "disabled",
}

export interface CWButtonProps {
  title: string;
  variant?: CWButtonVariant;
  size?: CWButtonSize;
  state?: CWButtonState;
  stretch?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  kind?: CWButtonKind;
}

export enum CWButtonKind {
  PRIMARY,
  SECONDARY,
  TERTIARY,
  CIRCLE,
}
import { StyleProp, ViewStyle } from "react-native";
import { IconKey } from "../CWUtilities/IconUtility";

export enum IconKind {
  DEFAULT = "default",
  BACKGROUND = "background",
  BACKGROUND_BOLD = "background_bold",
}
export enum IconSize {
  XS = "xs",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XL = "xl",
  XXL = "xxl",
}

export enum IconColor {
  PRIMARY  =  "primary_50",
  PRIMARY60 =  "primary_60",
  SECONDARY =  "secondary_50",
  SPARKLE =  "sparkle_50",
  GREY100 = "primary_grey_100",
  GREY80 = "primary_grey_80",
  GREY60 = "primary_grey_60",
  SUCCESS = "feedback_success",
  WARNING = "feedback_warning",
  ERROR = "feedback_error",
  INVERSE = "primary_inverse",
}
export interface CWIconProps {
  ic: IconKey;
  kind?: IconKind;
  size?: IconSize;
  color?: IconColor;
  style?: StyleProp<ViewStyle>;
  isClickable?: boolean;
  onClick?: () => void;
  
}

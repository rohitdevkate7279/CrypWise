import { LayoutChangeEvent, StyleProp, TextStyle } from "react-native";
import { CWColor } from "../../theme/CWColor.types";

export enum CWTypography {
  BODY_S = "body_s",
  HEADING_XL = "heading_xl",
  HEADING_L = "heading_l",
  HEADING_M = "heading_m",
  HEADING_S = "heading_s",
  HEADING_XS = "heading_xs",
  HEADING_XXS = "heading_xxs",
  OVERLINE = "overline",
  BODY_L = "body_l",
  BODY_L_BOLD = "body_l_bold",
  BODY_M = "body_m",
  BODY_M_BOLD = "body_m_bold",
  BODY_M_LINK = "body_m_link",
  BODY_S_BOLD = "body_s_bold",
  BODY_S_LINK = "body_s_link",
  BODY_XS = "body_xs",
  BODY_XS_BOLD = "body_xs_bold",
  BODY_XS_LINK = "body_xs_link",
  BODY_XXS = "body_xxs",
  BODY_XXS_BOLD = "body_xxs_bold",
  BODY_XXS_LINK = "body_xxs_link",
  BUTTON = "button",
  BODY_3XS = "body_3xs",
  BODY_3XS_BOLD = "body_3xs_bold",
  BODY_3XS_LINK = "body_3xs_link",
}

export interface CWTextProps {
  text?: string;
  appearance?: CWTypography;
  color?: CWColor;
  style?: StyleProp<TextStyle> | undefined;
  maxLines?: number | undefined;
  minLines? : number | undefined;
  textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  allowFontScaling?: boolean;
  textBreakStrategy?:"simple" | "highQuality" | "balanced" | undefined
  onLayout?: (event: LayoutChangeEvent) => void
}

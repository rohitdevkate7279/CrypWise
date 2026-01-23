import { CWColor } from "./CWColor.types";
import { useTheme } from "./CWCustomTokenProvider";

export const useColor = (token: CWColor) => {
  const theme = useTheme();
  switch (token) {
    case "primary_90":
      return theme.colors.primary_90;
    case "primary_80":
      return theme.colors.primary_80;
    case "primary_70":
      return theme.colors.primary_70;
    case "primary_60":
      return theme.colors.primary_60;
    case "primary_50":
      return theme.colors.primary_50;
    case "primary_40":
      return theme.colors.primary_40;
    case "primary_30":
      return theme.colors.primary_30;
    case "primary_20":
      return theme.colors.primary_20;
    case "primary_inverse":
      return theme.colors.primary_inverse;
    case "primary_background":
      return theme.colors.primary_background;
    case "heading":
      return theme.colors.heading
       default:
      return theme.colors.transparent;
  }
};

import { Text } from "react-native";
import React, { useMemo } from "react";
import { CWTextProps, CWTypography } from "./CWTextType";
import { useTypography } from ".";
import { useColor } from "../../theme/color";

function CWText({
  appearance = CWTypography.BODY_S,
  color = "primary_90",
  text = "",
  style,
  minLines = 1,
  maxLines = Number.MAX_SAFE_INTEGER,
  textAlign = "left",
  ellipsizeMode = "tail",
  allowFontScaling,
  textBreakStrategy,
  onLayout,
}: CWTextProps) {
  const textStyle = useMemo(() => useTypography(appearance), [appearance]);
  const textColor = useColor(color);
  const minHeight = minLines > 0 ? minLines * textStyle.lineHeight : undefined;
  if (!text) return null;
  return (
    <Text
      style={[textStyle, { color: textColor, textAlign: textAlign,minHeight }, style]}
      numberOfLines={maxLines}
      ellipsizeMode={ellipsizeMode}
      allowFontScaling={allowFontScaling}
      onLayout={onLayout}
      textBreakStrategy={textBreakStrategy}
    >
      {text}
    </Text>
  );
}

export default CWText;

import React, { useMemo } from "react";
import { Pressable, View } from "react-native";
import { IconUtility } from "../../CWUtilities/IconUtility";
import { useColor } from "../../theme/color";
import { CWIconProps, IconSize } from "./CWIcon.types";
import { getIconSizeWithBackground, getIconSizeOnly } from "./IconsUtils";


export function CWIcon({
  ic,
  kind = 'default',
  color = 'primary_50',
  backgroundColor,
  size = IconSize.MEDIUM,
  isClickable = false,
  style,
  onClick,
}: CWIconProps) {
  const renderIcon = () => {

    if (kind === 'default' && !backgroundColor) {
      return <CustomIconOnly ic={ic} color={color} size={size} kind={kind}></CustomIconOnly>;
    } else {
      if ((size === IconSize.SMALL || size === IconSize.XS) && !backgroundColor) {
        return <CustomIconOnly ic={ic} color={color} size={size} kind={kind}></CustomIconOnly>;
      } else if(backgroundColor){
        return (
          <CustomIconWithBackground
            ic={ic}
            color={color}
            size={size}
            kind={kind}
            backgroundColor={backgroundColor}
          ></CustomIconWithBackground>
        );
      }
    }
  }
  if (isClickable) {
    return (
      <Pressable onPress={onClick} style={style}>
        {renderIcon()}
      </Pressable>
    )
  }
  else {
    return (
      <View style={style}>
        {renderIcon()}
      </View>
    )
  }
}

function CustomIconWithBackground(props: CWIconProps) {
  const size = useMemo(() => {
    return getIconSizeWithBackground(props.size);
  }, [props.size]);
  const iconColor = useColor(props.color || 'red')
  const bgColor = useColor(props.backgroundColor || 'red')

  return (
    <View
      style={{
        backgroundColor: bgColor,
        width: size.background,
        height: size.background,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 200,
      }}
    >
      {IconUtility.getIconFromKey(props.ic, iconColor, size.icon)}
    </View>
  );
}

function CustomIconOnly(props: CWIconProps) {
  const iconColor = useColor(props.color || 'primary_50');
  const iconSize = useMemo(() => {
    return getIconSizeOnly(props.size).icon;
  }, [props.size]);
  return IconUtility.getIconFromKey(props.ic, iconColor, iconSize);
}
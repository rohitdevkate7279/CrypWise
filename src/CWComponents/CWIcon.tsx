import React, { useMemo } from "react";
import { Pressable,View } from "react-native";
import { IconKind, IconColor, IconSize, CWIconProps } from "./CWIcon.types";
import { IconUtility } from "../CWUtilities/IconUtility";

export function CWIcon({
  ic,
  kind = IconKind.DEFAULT,
  color = IconColor.PRIMARY,
  size = IconSize.MEDIUM,
  isClickable = false,
  style,
  onClick,
}: CWIconProps) {
  const renderIcon = () => {
    if (kind === IconKind.DEFAULT) {
      return <IconOnly ic={ic} color={color} size={size} kind={kind}></IconOnly>;
    } else {
      if (size === IconSize.SMALL || size === IconSize.XS) {
        return <IconOnly ic={ic} color={color} size={size} kind={kind}></IconOnly>;
      } else {
        return (
          <IconWithBackground
            ic={ic}
            color={color}
            size={size}
            kind={kind}
          />
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

function IconWithBackground(props: CWIconProps) {
  const size = useMemo(() => {
    return getIconSizeWithBackground(props.size);
  }, [props.size]);
  const iconColor = useColor(getIconColorToken(props.color, props.kind));
  const bgColor = useColor(getBackgroundColorToken(props.color, props.kind));
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

function IconOnly(props: CWIconProps) {
  const iconColor = useColor(getIconColorToken(props.color, props.kind));
  const iconSize = useMemo(() => {
    return getIconSizeOnly(props.size).icon;
  }, [props.size]);
  return IconUtility.getIconFromKey(props.ic, iconColor, iconSize);
}

function getIconColorToken(colorToken?: IconColor, kind?: IconKind) {
  switch (colorToken) {
    case IconColor.PRIMARY:
      switch (kind) {
        case IconKind.DEFAULT:
        case IconKind.BACKGROUND:
          return colorToken;
        case IconKind.BACKGROUND_BOLD:
          return "primary_inverse";
      }
    case IconColor.PRIMARY60:
      switch (kind) {
        case IconKind.DEFAULT:
        case IconKind.BACKGROUND:
          return colorToken;
        case IconKind.BACKGROUND_BOLD:
          return "primary_inverse";
      }
    case IconColor.SECONDARY:
      switch (kind) {
        case IconKind.DEFAULT:
        case IconKind.BACKGROUND:
          return colorToken;
        case IconKind.BACKGROUND_BOLD:
          return "secondary_inverse";
      }
    case IconColor.SPARKLE:
      switch (kind) {
        case IconKind.DEFAULT:
        case IconKind.BACKGROUND:
          return colorToken;
        case IconKind.BACKGROUND_BOLD:
          return "sparkle_inverse";
      }
    case IconColor.GREY60:
    case IconColor.GREY80:
    case IconColor.GREY100:
      return colorToken;

    case IconColor.SUCCESS:
      return "feedback_success_50";

    case IconColor.ERROR:
      return "feedback_error_50";

    case IconColor.WARNING:
      return "feedback_warning_50";

    case IconColor.INVERSE:
      return colorToken
    default:
      return "primary_50";
  }
}

function getBackgroundColorToken(colorToken?: IconColor, kind?: IconKind) {
  switch (colorToken) {
    case IconColor.PRIMARY:
      switch (kind) {
        case IconKind.DEFAULT:
          return "transparent";
        case IconKind.BACKGROUND:
          return "primary_20";
        case IconKind.BACKGROUND_BOLD:
          return "primary_50";
      }
    case IconColor.PRIMARY60:
      switch (kind) {
        case IconKind.DEFAULT:
          return "transparent";
        case IconKind.BACKGROUND:
          return "primary_20";
        case IconKind.BACKGROUND_BOLD:
          return "primary_60";
      }
    case IconColor.SECONDARY:
      switch (kind) {
        case IconKind.DEFAULT:
          return "transparent";
        case IconKind.BACKGROUND:
          return "secondary_20";
        case IconKind.BACKGROUND_BOLD:
          return "secondary_50";
      }
    case IconColor.SPARKLE:
      switch (kind) {
        case IconKind.DEFAULT:
          return "transparent";
        case IconKind.BACKGROUND:
          return "sparkle_20";
        case IconKind.BACKGROUND_BOLD:
          return "sparkle_50";
      }
    case IconColor.GREY60:
    case IconColor.GREY80:
    case IconColor.GREY100:
      switch (kind) {
        case IconKind.DEFAULT:
        case IconKind.BACKGROUND_BOLD:
          return "transparent"
        case IconKind.BACKGROUND:
          return "primary_grey_20";
      }

    case IconColor.SUCCESS:
    case IconColor.ERROR:
    case IconColor.WARNING:
      return "transparent";
    default:
      return "transparent";
  }
}

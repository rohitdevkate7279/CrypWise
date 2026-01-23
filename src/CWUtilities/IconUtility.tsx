import * as CoreIcons from "../CWAssets/asset";
import React from "react";
import { IconSize } from "../CWComponents/CWIcon.types";

// const Icons = { ...CoreIcons, ...ExtendedIcons };
const Icons = { ...CoreIcons };

export type IconKey = keyof typeof Icons;

export const IconUtility = {
  getIconFromKey: (key: string, color: string, size: number) => {
    const CurrentIcon = Icons[key as IconKey];
    if (CurrentIcon) {
      return <CurrentIcon color={color} size={size} />;
    } else {
      return <CoreIcons.IcCWDot color={color} size={size} />;
    }
  },
};

export const getIconSizeOnly = (size?: IconSize) => {
    switch (size) {
        case IconSize.XS:
            return { icon: 12 };
        case IconSize.SMALL:
            return { icon: 16 };
        case IconSize.MEDIUM:
            return { icon: 24 };
        case IconSize.LARGE:
            return { icon: 32 };
        case IconSize.XL:
            return { icon: 40 };
        case IconSize.XXL:
            return { icon: 48 };
        default:
            return { icon: 24 };
    }
};
export const getIconSizeWithBackground = (size?: IconSize) => {
    switch (size) {
        case IconSize.XS:
            return { icon: 12 };
        case IconSize.SMALL:
            return { icon: 16 };
        case IconSize.MEDIUM:
            return { icon: 16, background: 24 }
        case IconSize.LARGE:
            return { icon: 24, background: 32 };
        case IconSize.XL:
            return { icon: 28, background: 40 };
        case IconSize.XXL:
            return { icon: 32, background: 48 };
        default:
            return { icon: 16, background: 24 };
    }
};

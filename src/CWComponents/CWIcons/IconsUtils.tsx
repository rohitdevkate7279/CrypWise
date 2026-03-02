import { IconSize } from "./CWIcon.types";

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

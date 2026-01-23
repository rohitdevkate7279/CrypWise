import { StyleProp, ViewStyle } from "react-native";

export interface CWLoaderProps {
    appearance ?: CWLoaderAppearance;
    label ?: string;
    labelPosition ?: JWLabelPosition;
    size ?: CWLoaderSize;
    style?: StyleProp<ViewStyle>;
}

export enum CWLoaderAppearance {
    NORMAL = 'normal',
    INLINE = 'inline',
    VIBRANT = 'vibrant'
}

export enum JWLabelPosition {
    BOTTOM = 'bottom',
    RIGHT = 'right'
}

export enum CWLoaderSize {
    BUTTON = 'button',
    SMALL ='small',
    MEDIUM = 'medium',
}
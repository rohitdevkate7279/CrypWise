import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { styles } from "./CWButton.styles";
import {
  CWButtonKind,
  CWButtonProps,
  CWButtonSize,
  CWButtonState,
  CWButtonVariant,
} from "./CWButton.types";
import {
  CW_BUTTON_GRADIENT,
  CW_BUTTON_HEIGHT,
  CW_BUTTON_SOLID,
  CW_BUTTON_RADIUS,
  CW_BUTTON_BORDER,
} from "./CWButton.tokens";

import CWLoader from "../CWLoader/CWLoader";
import { CWLoaderSize } from "../CWLoader/CWLoaderTypes";
import CWText from "../CWText/CWText";
import { CWTypography } from "../CWText/CWTextType";

export default function CWButton({
  title,
  variant = CWButtonVariant.GRADIENT,
  size = CWButtonSize.MEDIUM,
  state = CWButtonState.NORMAL,
  stretch = false,
  kind = CWButtonKind.PRIMARY,
  onPress,
  style,
}: CWButtonProps) {
  const isDisabled =
    state === CWButtonState.DISABLED ||
    state === CWButtonState.LOADING;

  const height = CW_BUTTON_HEIGHT[size];

  const textColor =
    kind === CWButtonKind.PRIMARY ? "black" : "primary_80"
    
  const content = (
    <View style={styles.content}>
      {state === CWButtonState.LOADING ? (
        <CWLoader size={CWLoaderSize.BUTTON} />
      ) : (
        <CWText
          text={title}
          appearance={CWTypography.BODY_M_BOLD}
          color={textColor}
        />
      )}
    </View>
  );

  const renderBackground = () => {
    switch (kind) {
      case CWButtonKind.CIRCLE:
        return (
          <View
            style={[
              styles.circle,
              {
                width: height,
                height: height,
                borderRadius: height / 2,
                backgroundColor: CW_BUTTON_SOLID.primary,
              },
            ]}
          >
            {content}
          </View>
        );
  
      case CWButtonKind.SECONDARY:
        return (
          <View
            style={[
              styles.solid,
              {
                backgroundColor: CW_BUTTON_SOLID.secondary,
                borderWidth: 1,
                borderColor: CW_BUTTON_BORDER.secondary,
              },
            ]}
          >
            {content}
          </View>
        );
  
      case CWButtonKind.TERTIARY:
        return <View style={styles.tertiary}>{content}</View>;
  
      case CWButtonKind.PRIMARY:
        if (variant === CWButtonVariant.GRADIENT) {
          return (
            <View style={{ flex: 1 }}>
              <LinearGradient
                colors={CW_BUTTON_GRADIENT.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
  
              {/* Glass highlight */}
              <LinearGradient
                colors={[
                  "rgba(255,255,255,0.35)",
                  "rgba(255,255,255,0.12)",
                  "rgba(255,255,255,0)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
  
              {content}
            </View>
          );
        }
  
        return (
          <View
            style={[
              styles.solid,
              { backgroundColor: CW_BUTTON_SOLID.primary },
            ]}
          >
            {content}
          </View>
        );
  
      default:
        return (
          <View
            style={[
              styles.solid,
              { backgroundColor: CW_BUTTON_SOLID.primary },
            ]}
          >
            {content}
          </View>
        );
    }
  };
  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.base,
        kind === CWButtonKind.CIRCLE
          ? {
              width: height,
              height: height,
              borderRadius: height / 2,
              alignSelf: "center",
            }
          : {
              height,
              borderRadius: CW_BUTTON_RADIUS,
            },
        stretch && kind !== CWButtonKind.CIRCLE && styles.stretch,
        isDisabled && styles.disabled,
        style,
      ]}    >
      {renderBackground()}
    </Pressable>
  );
}

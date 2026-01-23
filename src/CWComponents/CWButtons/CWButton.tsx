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
    kind === CWButtonKind.PRIMARY ? "primary_inverse" : "primary_60";

  const content = (
    <View style={styles.content}>
      {state === CWButtonState.LOADING ? (
        <CWLoader size={CWLoaderSize.BUTTON} />
      ) : (
        <CWText
          text={title}
          appearance={CWTypography.BODY_M_BOLD}
          color="primary_inverse"
        />
      )}
    </View>
  );

  const renderBackground = () => {
    // 🔹 PRIMARY + GRADIENT
    if (variant === CWButtonVariant.GRADIENT && kind === CWButtonKind.PRIMARY) {
      return (
        <View style={{ flex: 1 }}>
          {/* Base Gradient */}
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

          {/* Inner glass border */}
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                borderRadius: CW_BUTTON_RADIUS,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.25)",
              },
            ]}
          />

          {content}
        </View>
      );
    }

    // 🔹 SECONDARY (Outline)
    if (kind === CWButtonKind.SECONDARY) {
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
    }

    // 🔹 TERTIARY (Text only)
    if (kind === CWButtonKind.TERTIARY) {
      return <View style={styles.tertiary}>{content}</View>;
    }

    // 🔹 SOLID PRIMARY fallback
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
  };

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.base,
        { height, borderRadius: CW_BUTTON_RADIUS },
        stretch && styles.stretch,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {renderBackground()}
    </Pressable>
  );
}

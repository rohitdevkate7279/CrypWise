import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { CWLoaderSize } from "./CWLoaderTypes";

/**
 * 🔑 Key idea:
 * Loader sizes are semantic, not visual guesses
 */
const SIZE_MAP = {
  [CWLoaderSize.BUTTON]: {
    size: 24,     
    innerSize: 14,
    stroke: 3,
    outerDuration: 1200,
    innerDuration: 700, 
  },
  [CWLoaderSize.SMALL]: {
    size: 28,
    innerSize: 16,
    stroke: 3,
    outerDuration: 1400,
    innerDuration: 800,
  },
  [CWLoaderSize.MEDIUM]: {
    size: 36,
    innerSize: 20,
    stroke: 4,
    outerDuration: 2000,
    innerDuration: 1000,
  },
};

interface CWLoaderProps {
  size?: CWLoaderSize;
  style?: any;
}

export default function CWLoader({
  size = CWLoaderSize.MEDIUM,
  style,
}: CWLoaderProps) {
  const {
    size: SIZE,
    innerSize: INNER_SIZE,
    stroke: STROKE,
    outerDuration,
    innerDuration,
  } = SIZE_MAP[size];

  const outerRotate = useRef(new Animated.Value(0)).current;
  const innerRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const o = Animated.loop(
      Animated.timing(outerRotate, {
        toValue: 1,
        duration: outerDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    const i = Animated.loop(
      Animated.timing(innerRotate, {
        toValue: 1,
        duration: innerDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    o.start();
    i.start();

    return () => {
      o.stop();
      i.stop();
    };
  }, [outerDuration, innerDuration]);

  const outerSpin = outerRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const innerSpin = innerRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-360deg"],
  });

  // --- DASH MATH ---
  const outerRadius = (SIZE - STROKE) / 2;
  const outerCirc = 2 * Math.PI * outerRadius;

  const dot = STROKE;
  const gap = STROKE * 1.5;

  const outerDash = [
    outerCirc * 0.25, 0, // solid
    outerCirc * 0.25, 0, // solid
    dot, gap,
    dot, gap,
    dot, gap,
    dot, gap,
  ].join(" ");

  const innerRadius = (INNER_SIZE - STROKE) / 2;
  const innerCirc = 2 * Math.PI * innerRadius;

  const innerDash = [
    innerCirc * 0.25, 0,
    dot, gap,
    dot, gap,
    dot, gap,
  ].join(" ");

  return (
    <View style={[styles.container, { width: SIZE, height: SIZE }, style]}>
      {/* OUTER */}
      <Animated.View style={{ transform: [{ rotate: outerSpin }] }}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={outerRadius}
            stroke="#FFFFFF"
            strokeWidth={STROKE}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={outerDash}
          />
        </Svg>
      </Animated.View>

      {/* INNER */}
      <Animated.View style={[styles.inner, { transform: [{ rotate: innerSpin }] }]}>
        <Svg width={INNER_SIZE} height={INNER_SIZE}>
          <Circle
            cx={INNER_SIZE / 2}
            cy={INNER_SIZE / 2}
            r={innerRadius}
            stroke="#FF6A2A"
            strokeWidth={STROKE}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={innerDash}
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    position: "absolute",
  },
});





// import {  Animated, View } from "react-native";
// import React, { useEffect, useRef } from "react";
// import Svg, { Circle, G } from "react-native-svg";
// import { CWTypography } from "../CWText/CWTextType";
// import { useColor } from "../../theme/color";
// import CWText from "../CWText/CWText";
// import { CWLoaderAppearance, CWLoaderProps, CWLoaderSize, JWLabelPosition } from "./CWLoaderTypes";



// const CWLoader = ({
//   appearance = CWLoaderAppearance.NORMAL,
//   label = "",
//   labelPosition = JWLabelPosition.RIGHT,
//   size = CWLoaderSize.MEDIUM,
//   style
// }: CWLoaderProps) => {
//   const radius = size === CWLoaderSize.SMALL ? 12 : 24;
//   const strokeWidth = size === CWLoaderSize.SMALL ? 4 : 8;
//   const AnimatedCircle = Animated.createAnimatedComponent(Circle);
//   const circumference = 2 * radius * Math.PI;
//   const halfCircle = radius + strokeWidth;

//   return (
//     <View
//       style={[style,{
//         flexDirection:
//           labelPosition === JWLabelPosition.BOTTOM ? "column" : "row",
//           alignItems:'center',
//           gap : size===CWLoaderSize.SMALL ? 12 : 16,
//       }]}
//     >
//         {appearance === CWLoaderAppearance.VIBRANT ? (
          
//           <VibrantSpinner></VibrantSpinner>
//         ) : (
//           <NormalSpinner></NormalSpinner>
//         )}
//       <CWText
//         style={{ alignSelf: "center" }}
//         appearance={size===CWLoaderSize.SMALL?CWTypography.BODY_S:CWTypography.BODY_M}
//         color={"primary_grey_80"}
//         text={label}
//       ></CWText>
//     </View>
//   );


//   function NormalSpinner() {
//     const progress = useRef(new Animated.Value(0)).current;
//     useEffect(() => {
//      const animation =  Animated.loop(
//       Animated.timing(progress,{
//         toValue:1,
//         duration:1000,
//         useNativeDriver:false,
//       })
//     )
//     animation.start();
//     return ()=>{
//       animation.stop();
//     }
//     });
   
//     return (
//       <View>
//         <Svg
//           width={radius * 2}
//           height={radius * 2}
//           viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
//         >
//           <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
//             <Circle
//               cx="50%"
//               cy="50%"
//               r={radius}
//               stroke={useColor("primary_grey_40")}
//               strokeWidth={strokeWidth}
//               fill="transparent"
//             />
//             <AnimatedCircle
//               cx="50%"
//               cy="50%"
//               r={radius}
//               stroke={appearance===CWLoaderAppearance.INLINE?useColor("primary_grey_80"):useColor("primary_50")}
//               strokeWidth={strokeWidth}
//               fill="transparent"
//               strokeLinecap="round"
//               strokeDasharray={circumference}
//               strokeDashoffset={ progress.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [circumference, 0],
//               })}
//             />
//           </G>
//         </Svg>
//       </View>
//     );
//   }

//   function VibrantSpinner() {
//     const progress1 = useRef(new Animated.Value(0)).current;
//     const progress2 = useRef(new Animated.Value(0)).current;
//     const progress3 = useRef(new Animated.Value(0)).current;
//     useEffect(() => {
//       const animatedCircles  = ()=> Animated.parallel([
        
//         Animated.timing(progress1, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: false,
//         }),
//         Animated.timing(progress2, {
//           delay:100,
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: false,
//         }),
//         Animated.timing(progress3, {
//           toValue: 1,
//           delay:200,
//           duration: 1000,
//           useNativeDriver: false,
//         }),
//       ]).start(() => {

//         progress1.setValue(0);
//         progress2.setValue(0);
//         progress3.setValue(0);
//         animatedCircles?.();
//       })

//       animatedCircles()

//     },[]);
//     return (
//       <View>
//         <Svg
//           width={radius * 2}
//           height={radius * 2}
//           viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
//         >
//           <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
//             <Circle
//               cx="50%"
//               cy="50%"
//               r={radius}
//               stroke={useColor("primary_grey_40")}
//               strokeWidth={strokeWidth}
//               fill="transparent"
//             />
//             <AnimatedCircle
//               cx="50%"
//               cy="50%"
//               r={radius}
//               stroke={useColor("sparkle_50")}
//               strokeWidth={strokeWidth}
//               fill="transparent"
//               strokeLinecap="round"
//               strokeDasharray={circumference}
//               strokeDashoffset={ progress1.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [circumference, 0],
//               })}
//             />
//             <AnimatedCircle
//               cx="50%"
//               cy="50%"
//               r={radius}
//               stroke={useColor("secondary_50")}
//               strokeWidth={strokeWidth}
//               fill="transparent"
//               strokeLinecap="round"
//               strokeDasharray={circumference}
//               strokeDashoffset={ progress2.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [circumference, 0],
//               })}
       
//             ></AnimatedCircle>
//             <AnimatedCircle
//               cx="50%"
//               cy="50%"
//               r={radius}
//               stroke={useColor("primary_50")}
//               strokeWidth={strokeWidth}
//               fill="transparent"
//               strokeLinecap="round"
//               strokeDasharray={circumference}
//               strokeDashoffset={ progress3.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [circumference, 0],
//               })}
//             ></AnimatedCircle>
//           </G>
//         </Svg>
//       </View>
//     );
//   }
// };
  


  



// export default CWLoader;
















// import React, { useEffect, useRef } from "react";
// import { View, Animated, Easing, StyleSheet } from "react-native";
// import Svg, { Circle } from "react-native-svg";

// export enum CWLoaderSize {
//   SMALL = "small",
//   MEDIUM = "medium",
// }


// interface DualDottedSpinnerProps {
//   size?: CWLoaderSize;
// }

// const SIZE_CONFIG = {
//   [CWLoaderSize.SMALL]: {
//     size: 20,
//     innerSize: 10,
//     stroke: 2,
//     outerDuration: 1400,
//     innerDuration: 800,
//   },
//   [CWLoaderSize.MEDIUM]: {
//     size: 48,
//     innerSize: 24,
//     stroke: 3,
//     outerDuration: 2000,
//     innerDuration: 1000,
//   },
// };


// export default function DualDottedSpinner({
//   size = CWLoaderSize.MEDIUM,
// }: DualDottedSpinnerProps) {
//   const {
//     size: SIZE,
//     innerSize: INNER_SIZE,
//     stroke: STROKE,
//     outerDuration,
//     innerDuration,
//   } = SIZE_CONFIG[size];

//   const outerRotate = useRef(new Animated.Value(0)).current;
//   const innerRotate = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const outerAnim = Animated.loop(
//       Animated.timing(outerRotate, {
//         toValue: 1,
//         duration: outerDuration,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     );

//     const innerAnim = Animated.loop(
//       Animated.timing(innerRotate, {
//         toValue: 1,
//         duration: innerDuration,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     );

//     outerAnim.start();
//     innerAnim.start();

//     return () => {
//       outerAnim.stop();
//       innerAnim.stop();
//     };
//   }, [outerRotate, innerRotate, outerDuration, innerDuration]);

//   const outerSpin = outerRotate.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   const innerSpin = innerRotate.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "-360deg"],
//   });

//   // --- DASH MATH ---
//   const outerRadius = (SIZE - STROKE) / 2;
//   const outerCirc = 2 * Math.PI * outerRadius;

//   const dot = STROKE;
//   const gap = STROKE * 1.5;

//   const outerDash = [
//     outerCirc * 0.25, 0, // solid
//     outerCirc * 0.25, 0, // solid
//     dot, gap,
//     dot, gap,
//     dot, gap,
//     dot, gap,
//   ].join(" ");

//   const innerRadius = (INNER_SIZE - STROKE) / 2;
//   const innerCirc = 2 * Math.PI * innerRadius;

//   const innerDash = [
//     innerCirc * 0.25, 0,
//     dot, gap,
//     dot, gap,
//     dot, gap,
//   ].join(" ");

//   return (
//     <View style={[styles.container, { width: SIZE, height: SIZE }]}>
//       {/* OUTER RING */}
//       <Animated.View style={{ transform: [{ rotate: outerSpin }] }}>
//         <Svg width={SIZE} height={SIZE}>
//           <Circle
//             cx={SIZE / 2}
//             cy={SIZE / 2}
//             r={outerRadius}
//             stroke="#FFFFFF"
//             strokeWidth={STROKE}
//             fill="none"
//             strokeLinecap="round"
//             strokeDasharray={outerDash}
//           />
//         </Svg>
//       </Animated.View>

//       {/* INNER RING */}
//       <Animated.View
//         style={[
//           styles.inner,
//           { transform: [{ rotate: innerSpin }] },
//         ]}
//       >
//         <Svg width={INNER_SIZE} height={INNER_SIZE}>
//           <Circle
//             cx={INNER_SIZE / 2}
//             cy={INNER_SIZE / 2}
//             r={innerRadius}
//             stroke="#FF3D00"
//             strokeWidth={STROKE}
//             fill="none"
//             strokeLinecap="round"
//             strokeDasharray={innerDash}
//           />
//         </Svg>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inner: {
//     position: "absolute",
//   },
// });























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





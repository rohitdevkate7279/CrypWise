import {Animated, ColorValue, View, ViewStyle} from 'react-native';
import {memo, useEffect, useRef} from 'react';

interface JWVerticalStickProps {
  focusColor?: ColorValue;
  style?: ViewStyle;
  focusStickBlinkingDuration?: number;
}

const CWVerticalStick: React.FC<JWVerticalStickProps> = memo(
  ({focusColor, style, focusStickBlinkingDuration = 350}) => {
    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0,
            useNativeDriver: true,
            duration: focusStickBlinkingDuration,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            useNativeDriver: true,
            duration: focusStickBlinkingDuration,
          }),
        ]),
        {
          iterations: -1,
        },
      ).start();
    }, []);

    return (
      <Animated.View style={{opacity: opacityAnim}}>
        <View
          style={[
            {
              width: 2,
              height: 30,
            },
            focusColor ? {backgroundColor: focusColor} : {},
            style,
          ]}
          testID="otp-input-stick"
        />
      </Animated.View>
    );
  },
);

// CWVerticalStick.propTypes = {
//   focusColor: PropTypes.string,
//   focusStickBlinkingDuration: PropTypes.number,
//   style: PropTypes.object,
// };

export default CWVerticalStick;

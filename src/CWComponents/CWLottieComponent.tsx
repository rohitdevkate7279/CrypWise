import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { IconKey } from '../CWUtilities/IconUtility';
import { IconSize, IconColor } from './CWIcons/CWIcon.types';
import { CWColor } from '../theme/CWColor.types';
import { useColor } from '../theme/color';
import { CWIcon } from './CWIcons/CWIcon';

interface JBLottieComponentProps {
  imageUrl?: string;
  style?: any;
  children?: React.ReactNode;
  backgroundColor?: string;
  onAnimationFinish?: () => void;
  fallbackIcon?: IconKey;
  fallbackIconSize?: IconSize;
  fallbackIconColor?: CWColor;
  loop?: boolean;
}

const CWLottieComponent: React.FC<JBLottieComponentProps> = props => {
  const [hasLoaded, setHasLoaded] = useState(false);

  const iconColor = useColor(
    `${props.fallbackIconColor ?? 'neutral_60'}` as CWColor,
  );

  return (
    <View style={[styles.container, props.style, props.backgroundColor && { backgroundColor: props.backgroundColor }]}>
      
      {/* Fallback UI */}
      {(!hasLoaded || !props.imageUrl) && (
        <View style={styles.fallback}>
          {props.children ? (
            props.children
          ) : (
            <CWIcon
              ic={props.fallbackIcon ?? 'IcImage'}
              size={props.fallbackIconSize ?? IconSize.SMALL}
              color={iconColor as IconColor}
            />
          )}
        </View>
      )}

      {/* Lottie Animation */}
      <LottieView
        source={{ uri: props.imageUrl ?? '' }}
        autoPlay
        loop={props.loop ?? false}
        resizeMode="contain"
        onAnimationLoaded={() => setHasLoaded(true)}
        onAnimationFailure={() => setHasLoaded(false)}
        onAnimationFinish={() => {
          props.onAnimationFinish?.();
        }}
      />
    </View>
  );
};

export default CWLottieComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react'
import { Animated, StyleProp, ViewStyle } from 'react-native'

type Props = {
  children: React.ReactNode
  scrollY: Animated.Value
  contentContainerStyle?: StyleProp<ViewStyle>
}

const CWScrollView = ({ children, scrollY, contentContainerStyle }: Props) => {
  
  return (
    <Animated.ScrollView
    contentContainerStyle={contentContainerStyle}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      {children}
    </Animated.ScrollView>
  )
}

export default CWScrollView

import React, { useEffect, useRef } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Animated,
  Vibration,
} from 'react-native'
import { useColors } from '../theme/CWCustomTokenProvider'
import { CWIcon } from './CWIcons/CWIcon'
import { IconSize } from './CWIcons/CWIcon.types'
import CWText from './CWText/CWText'
import { CWTypography } from './CWText/CWTextType'
import { IconKey } from '../CWUtilities/IconUtility'
import { KeyboardTypeOptions } from "react-native";
import { FeedbackState } from '../CWUtilities/Feedback'

export enum CWTextInputState {
  NORMAL = "normal",
  ERROR = "error",
  SUCCESS = "success"
}
export type CWTextInputProps = {
  value?: string
  placeholder?: string
  label?: string

  onChangeText?: (text: string) => void

  leftIcon?: IconKey
  suffixIcon?: IconKey
  onsuffixClick?: () => void

  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions
  editable?: boolean
  autoFocus?: boolean
  state?: CWTextInputState.NORMAL | CWTextInputState.ERROR | CWTextInputState.SUCCESS
  errorText?: string
  maxLength?:number
}

const CWTextInput = ({
  value,
  placeholder,
  label,
  onChangeText,
  leftIcon,
  suffixIcon,
  onsuffixClick,
  secureTextEntry,
  keyboardType="default",
  editable = true,
  errorText,
  autoFocus = false,
  maxLength,
  state = CWTextInputState.NORMAL
}: CWTextInputProps) => {
  const colors = useColors()

  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state === CWTextInputState.ERROR) {
      Vibration.vibrate(80);

      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 4, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [state]);


  return (
    <View style={{ marginBottom: 16 }}>
      {/* LABEL */}
      {label && (
        <CWText
          text={label}
          appearance={CWTypography.BODY_S}
          style={{ marginBottom: 6, color: colors.primary_inverse }}
        />
      )}

      {/* INPUT CONTAINER */}
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: colors.primary_background,
            borderColor: errorText ? colors.feedback_error : colors.white,
          },
          { transform: [{ translateX: shakeAnim }] }
        ]}
      >
        {/* LEFT ICON */}
        {leftIcon && (
          <CWIcon ic={leftIcon} size={IconSize.MEDIUM} />
        )}

        {/* TEXT INPUT */}
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.65)"
          style={styles.input}
          onChangeText={(t) => onChangeText?.(t)}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
          autoCorrect={false}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck={false}
          textContentType="none"
          autoCapitalize="none"  
          maxLength={maxLength}
          />

        {/* SUFFIX ICON */}
        {suffixIcon && (
          <Pressable onPress={onsuffixClick} hitSlop={10}>
            <CWIcon ic={suffixIcon} size={IconSize.MEDIUM} />
          </Pressable>
        )}
      </Animated.View>

      {/* ERROR */}
      {state === CWTextInputState.ERROR && errorText && (<View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
        <CWIcon ic={"IcErrorColored"} size={IconSize.SMALL} />
        <CWText
          text={errorText}
          appearance={CWTypography.BODY_XS}
          style={{ color: 'red' }}
        />
        </View>
      )}
    </View>
  )
}

export default CWTextInput

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
})

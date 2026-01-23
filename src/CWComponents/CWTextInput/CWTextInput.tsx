  import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
  import {
    ColorValue,
    ViewStyle,
    Platform,
    Pressable,
    TextInput,
    View,
    Dimensions,
    StyleSheet,
  } from 'react-native';
  
  import React from 'react';
import { styles } from './CWTextInputStyles';
import { useTextInput } from './CWUseTextInput';
import { CWTextInputProps, CWTextInputRef } from './CWtextInpuTypes';
import { CWTypography } from '../CWText/CWTextType';
import CWVerticalStick from './CWVerticalStick';
import CWText from '../CWText/CWText';
import { useTheme } from '../../theme/CWCustomTokenProvider';
import { useColor } from '../../theme/color';
import { FeedbackState } from './CWfeedback';
  
  const CWTextInput = React.memo(forwardRef<CWTextInputRef, CWTextInputProps>(
    (props, ref) => {
      const {
        models: { text, inputRef, focusedInputIndex, hasCursor },
        actions: {
          clear,
          handlePress,
          handleTextChange,
          focus,
          handleFocus,
          handleBlur,
        },
        forms: { setTextWithRef },
      } = useTextInput(props);
      const {
        disabled,
        autoOtp = '',
        numberOfDigits = 4,
        autoFocus = true,
        hideStick,
        onResend,
        focusStickBlinkingDuration,
        secureTextEntry = false,
        theme = {},
        textInputProps,
        state = FeedbackState.CLEAR,
        stateMessage,
        inputContainer,
        mainContainerStyle,
        placeholder,
        gap,
        clearText,
        preventKeyboard = false
      } = props;
      const {
        containerStyle,
        inputsContainerStyle,
        pinCodeTextStyle,
        focusStickStyle,
        focusedPinCodeContainerStyle,
        filledPinCodeContainerStyle,
        disabledPinCodeContainerStyle,
      } = theme;
  
      function getPinBorderColor(state: FeedbackState): ColorValue {
        switch (state) {
          case FeedbackState.ERROR:
            return useColor('feedback_error_50');
          case FeedbackState.WARNING:
            return useColor('feedback_warning_50');
          case FeedbackState.SUCCESS:
            return useColor('feedback_success_50');
          default:
            return useColor('grey_80');
        }
      }
  
      
      const screenWidth = Dimensions.get('window').width;
      const focusColor: ColorValue = getPinBorderColor(state);
      const verticalStickColor: ColorValue = useColor('grey_80');
      const [stopKeyboard, setStopKeyboard] = useState(preventKeyboard);
      const pinOverrideCodeContainerStyle: ViewStyle = {
        borderColor: getPinBorderColor(state),
      };
      const CWTheme = useTheme();
  
      useEffect(() => {
        const delay = Platform.OS === 'ios' ? 1000 : 500
  
        if (autoFocus && !stopKeyboard) {
          const timeoutId = setTimeout(() => {
            if (inputRef?.current) {
              inputRef.current.focus();
            }
          }, delay);
  
          return () => clearTimeout(timeoutId);
        }
      }, [autoFocus, inputRef, stopKeyboard]);
  
      useEffect(() => {
        setTextWithRef(autoOtp);
      }, [autoOtp]);
  
      useEffect(() => {
        if (onResend || clearText) {
          setTextWithRef('');
        }
      }, [onResend, state, clearText]);
  
      // useEffect(() => {
      //   if (Platform.OS === 'android') {
      //     const checkRestrictedDevice = async () => {
      //       const isRestrictedDevice = await getIsRestrictedDevice()
      //       if (isRestrictedDevice) {
      //         setStopKeyboard(false)
      //       } else {
      //         setStopKeyboard(true)
      //       }
      //     }
      //     checkRestrictedDevice()
      //   }
      // }, [])
  
      useImperativeHandle(ref, () => ({ clear, focus, setValue: setTextWithRef }));
  
      const generatePinCodeContainerStyle = (
        isFocusedInput: boolean,
        char: string,
      ) => {
        const stylesArray = [styles.codeContainer, props.inputContainer, pinOverrideCodeContainerStyle];
        if (focusColor && isFocusedInput) {
          stylesArray.push({ borderColor: focusColor });
        }
  
        if (focusedPinCodeContainerStyle && isFocusedInput) {
          stylesArray.push(focusedPinCodeContainerStyle);
        }
  
        if (filledPinCodeContainerStyle && Boolean(char)) {
          stylesArray.push(filledPinCodeContainerStyle);
        }
  
        if (disabledPinCodeContainerStyle && disabled) {
          stylesArray.push(disabledPinCodeContainerStyle);
        }
  
        return stylesArray;
      };
  
      const handlePressIn = () => {
        if (stopKeyboard) return;
  
        const delay = Platform.OS === 'ios' ? 1000 : 500
  
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, delay);
      };
  
      return (
        <View style={{ flexDirection: 'column' }}>
          <View
            style={[styles.container, containerStyle]}>
            <View style={[styles.inputsContainer, mainContainerStyle, inputsContainerStyle, { gap: gap }]}>
              {Array(numberOfDigits)
                .fill(0)
                .map((_, index) => {
                  const char = text[index];
                  const isFocusedInput =
                    index === focusedInputIndex &&
                    !disabled &&
                    Boolean(hasCursor);
  
                  return (
                    <Pressable
                      key={`${char}-${index}`}
                      disabled={disabled}
                      onPress={handlePress}
                      style={generatePinCodeContainerStyle(isFocusedInput, char)}
                      testID="otp-input">
                      <>
                        {isFocusedInput && !hideStick ? (
                          <View style={{ flexDirection: 'row' }}>
                            <CWVerticalStick
                              focusColor={verticalStickColor}
                              style={focusStickStyle}
                              focusStickBlinkingDuration={focusStickBlinkingDuration} />
                            <CWText
                              text={char && secureTextEntry ? '•' : char || placeholder}
                              style={[styles.codeText, pinCodeTextStyle]}
                              appearance={char ? CWTypography.BODY_L_BOLD : CWTypography.BODY_L}
                              color={char ? 'grey_100' : 'grey_60'} />
                          </View>
                        ) : (
                          <CWText
                            text={char && secureTextEntry ? '•' : char || placeholder}
                            style={[styles.codeText, pinCodeTextStyle]}
                            appearance={CWTypography.BODY_L}
                            color={char ? 'grey_100' : 'grey_60'}
                          />
                        )
                        }
                      </>
                    </Pressable>
                  );
                })}
            </View>
            <TextInput
              value={text}
              onChangeText={handleTextChange}
              maxLength={numberOfDigits}
              inputMode="numeric"
              keyboardType="numeric"
              textContentType="oneTimeCode"
              ref={inputRef}
              caretHidden={true}
              contextMenuHidden={true}
              secureTextEntry={secureTextEntry}
              autoComplete={
                Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'
              }
              aria-disabled={disabled}
              editable={!disabled}
              testID="otp-input-hidden"
              onPressIn={handlePressIn}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...textInputProps}
              style={[
                styles.hiddenInput,
                textInputProps?.style,
                { color: 'transparent', backgroundColor: 'transparent' },
              ]}
              cursorColor={CWTheme.colors.primary_20}
              selectionColor={CWTheme.colors.grey_40}
            />
          </View>
          {/* {state !== FeedbackState.CLEAR && (
            <View
              style={{
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                marginTop: 12,
                paddingRight: 8,
              }}>
              <Feedback
                state={state}
                stateText={stateMessage}
                feedbackSize={FeedbackSize.XS}
              />
            </View>
          )} */}
        </View>
      );
    },
  ))
  
  export default CWTextInput;
  
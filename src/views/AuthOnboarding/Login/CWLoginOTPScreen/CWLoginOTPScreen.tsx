import React, { useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import CWBlockTextField from "../../../../CWComponents/CWBlockTextField/CWBlockTextField";
import CWButton from "../../../../CWComponents/CWButtons/CWButton";
import CWText from "../../../../CWComponents/CWText/CWText";
import { CWTypography } from "../../../../CWComponents/CWText/CWTextType";
import { AppScreens } from "../../../../navigation/CWNavigationConstants";
import ScreenSlot, { DeeplinkHandler } from "../../../../CWUtilities/CWScreenSlot";
import { NavigationStackData } from "../../../../navigation/CWNavGraph";
import useLoginOTPViewModel from "./useLoginOTPViewModel";
import { CWButtonState } from "../../../../CWComponents/CWButtons/CWButton.types";
import { CWTextInputState } from "../../../../CWComponents/CWTextInput";
import { FeedbackState } from "../../../../CWUtilities/Feedback";

type Props = NativeStackScreenProps<NavigationStackData, AppScreens.LOGIN_OTP_SCREEN>;

const CWLoginOTPScreen = ({ navigation, route }: Props) => {
  const { navigationBean, handleOtpFilled, handleResendOTP, handleContinue,isLoading, otp, otpError, otpSuccess, setOtp, setOtpError, setOtpSuccess } =
    useLoginOTPViewModel(navigation,route);

  const renderContent = useCallback(
    (scrollY: Animated.Value) => {
      return (
        <View style={styles.container}>
          <View style={styles.topSection}>
            <CWText
              text="Enter 6-digit Code"
              textAlign="center"
              appearance={CWTypography.HEADING_S}
              color="primary_inverse"
            />

            <CWText
              text="We've sent code to ***@gmail.com"
              textAlign="center"
              appearance={CWTypography.BODY_M_BOLD}
            />

            <View style={styles.otpContainer}>
              <CWBlockTextField
                numberOfDigits={6}
                focusStickBlinkingDuration={500}
                gap={12}
                autoOtp={"true"}
                placeholder="0"
                inputContainer={styles.otpInput}
                onFilled={handleOtpFilled}
                stateMessage="Incorrect OTP"
                onTextChange={(text) => {
                  setOtp(text);
                  if (otpError) {
                    setOtpError(false);
                  }
                  if (otpSuccess) {
                    setOtpSuccess(false);
                  }
                }}
                state={otpError? FeedbackState.ERROR : otpSuccess ? FeedbackState.SUCCESS :FeedbackState.CLEAR}
              />

              <CWText
                text="Didn't get OTP?"
                textAlign="center"
                appearance={CWTypography.BODY_M_BOLD}
                style={styles.didntGetOtp}
              />
              <Pressable onPress={() => handleResendOTP()}>
                <CWText
                  text="Resend Code"
                  textAlign="center"
                  appearance={CWTypography.BODY_M_BOLD}
                  color="primary_50"
                  style={styles.resendText}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CWButton title="Continue" onPress={() => handleContinue()} state={isLoading? CWButtonState.LOADING : otp.length === 6 ? CWButtonState.NORMAL : CWButtonState.DISABLED }/>
          </View>
        </View>
      );
    },
    [handleContinue, handleOtpFilled]
  );

  return (
    <DeeplinkHandler navigationBean={navigationBean} navigation={navigation}>
      {(bean) => (
        <ScreenSlot navigationBean={bean} navigation={navigation} disableBack>
          {(authState, scrollY) => renderContent(scrollY)}
        </ScreenSlot>
      )}
    </DeeplinkHandler>
  );
};

export default CWLoginOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  topSection: {
    gap: 8,
  },
  otpContainer: {
    marginTop: 60,
  },
  otpInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 120,
  },
  didntGetOtp: {
    marginTop: 24,
  },
  resendText: {
    marginTop: 8,
  },
  buttonContainer: {
    marginBottom: 24,
  },
});

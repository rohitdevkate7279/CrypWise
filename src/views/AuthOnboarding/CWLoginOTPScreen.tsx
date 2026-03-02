import React, { useCallback, useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Animated, Keyboard, StyleSheet, View } from "react-native";

import { AppScreens } from "../../CWUtilities/CWConstants";
import ScreenSlot, { DeeplinkHandler } from "../../CWUtilities/CWScreenSlot";
import { HeaderType } from "../../CWUtilities/CWScreenSlot.Types";
import {
  NavigationStackData,
  navigationBeanObj,
  ActionType,
} from "../../navigation/CWNavGraph";

import CWBlockTextField from "../../CWComponents/CWBlockTextField/CWBlockTextField";
import CWText from "../../CWComponents/CWText/CWText";
import { CWTypography } from "../../CWComponents/CWText/CWTextType";
import CWButton from "../../CWComponents/CWButtons/CWButton";

type Props = NativeStackScreenProps<
  NavigationStackData,
  AppScreens.LOGIN_OTP_SCREEN
>;

const CWLoginOTPScreen = ({ navigation }: Props) => {

  const navigationBean = useMemo(
    () =>
      navigationBeanObj({
        actionType: ActionType.OPEN_NATIVE,
        destination: "",
        actionUrl: "",
        userAuthenticationRequired: 1,
        headerVisibility: HeaderType.HIDDEN,
      }),
    []
  );

  const handleOtpFilled = useCallback((text: string) => {
    Keyboard.dismiss();
  }, []);

  const renderContent = useCallback(
    (scrollY: Animated.Value) => {
      return (
        <View style={styles.container}>
          <View style={styles.topSection}>
            <CWText
              text="Enter 4-digit Code"
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
                numberOfDigits={4}
                focusStickBlinkingDuration={500}
                gap={12}
                autoOtp={"true"}
                placeholder="0"
                inputContainer={styles.otpInput}
                onFilled={handleOtpFilled}
                stateMessage="Incorrect OTP"
              />

              <CWText
                text="Didn't get OTP?"
                textAlign="center"
                appearance={CWTypography.BODY_M_BOLD}
                style={styles.didntGetOtp}
              />

              <CWText
                text="Resend Code"
                textAlign="center"
                appearance={CWTypography.BODY_M_BOLD}
                color="primary_50"
                style={styles.resendText}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CWButton title="Continue" />
          </View>
        </View>
      );
    },
    [handleOtpFilled]
  );

  return (
    <DeeplinkHandler navigationBean={navigationBean} navigation={navigation}>
      {(bean) => (
        <ScreenSlot navigationBean={bean} navigation={navigation} showBack>
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
    borderRadius: 12,
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
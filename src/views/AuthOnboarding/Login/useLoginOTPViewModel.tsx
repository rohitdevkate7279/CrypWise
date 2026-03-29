import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActionType, navigateTo, navigationBeanObj } from "../../../navigation/CWNavGraph";
import { useMemo, useCallback, useState } from "react";
import { Keyboard } from "react-native";
import { HeaderType } from "../../../CWUtilities/CWScreenSlot.Types";
import { AppScreens } from "../../../CWUtilities/CWConstants";
import { checkBiometricAvailability } from "./Biometric/CWBiometric.service";

const useLoginOTPViewModel = (navigation: NativeStackNavigationProp<any>,
) => {

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

  const handleResendOTP = () => {

  }

  const handleContinue = () => {
    ;(async function bio() {
      try {
        // const bio = await checkBiometricAvailability()
        // console.log(bio?.available ?? false, bio?.biometryType);
          navigateTo({
            actionType: ActionType.OPEN_NATIVE,
            destination: AppScreens.MPIN_SCREEN,
            headerVisibility: HeaderType.VISIBLE,
            navTitle:
              '',
            actionUrl: '',
            params: {
            },
          },
            navigation,
          );
    
      } catch (error) {
        console.log(error)
      }
    }())
  }


  return {
    navigationBean,
    handleOtpFilled,
    handleResendOTP,
    handleContinue
  }
}

export default useLoginOTPViewModel
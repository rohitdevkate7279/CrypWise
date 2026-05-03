import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActionType, navigateTo, navigationBeanObj } from "../../../../navigation/CWNavGraph";
import { useMemo, useCallback } from "react";
import { Keyboard } from "react-native";
import { HeaderType } from "../../../../CWUtilities/CWScreenSlot.Types";
import { AppScreens } from "../../../../navigation/CWNavigationConstants";

const useLoginOTPViewModel = (navigation: NativeStackNavigationProp<any>) => {
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

  const handleResendOTP = () => {};

  const handleContinue = () => {
    navigateTo(
      {
        actionType: ActionType.OPEN_NATIVE,
        destination: AppScreens.MPIN_SCREEN,
        headerVisibility: HeaderType.VISIBLE,
        navTitle: "",
        actionUrl: "",
        params: {},
      },
      navigation
    );
  };

  return {
    navigationBean,
    handleOtpFilled,
    handleResendOTP,
    handleContinue,
  };
};

export default useLoginOTPViewModel;

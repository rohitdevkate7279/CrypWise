import { useMemo } from "react";
import { Keyboard } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActionType, navigateTo, navigationBeanObj } from "../../../../navigation/CWNavGraph";
import { AppScreens } from "../../../../CWUtilities/CWConstants";
import { HeaderType } from "../../../../CWUtilities/CWScreenSlot.Types";

const useMpinViewModel = (navigation: NativeStackNavigationProp<any>) => {
  const navigationBean = useMemo(
    () =>
      navigationBeanObj({
        actionType: ActionType.OPEN_NATIVE,
        destination: "",
        actionUrl: "",
        userAuthenticationRequired: 1,
        headerVisibility: HeaderType.VISIBLE,
        navTitle: "Setup Your MPIN",
      }),
    []
  );

  const handleMpinFilled = () => {
    Keyboard.dismiss();
  };

  const handleContinue = () => {
    navigateTo(
      {
        actionType: ActionType.OPEN_NATIVE,
        destination: AppScreens.CONFIRM_MPIN_SCREEN,
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
    handleMpinFilled,
    handleContinue,
  };
};

export default useMpinViewModel;

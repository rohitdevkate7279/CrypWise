import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { AppScreens } from "../../../../CWUtilities/CWConstants";
import { navigateTo, ActionType } from "../../../../navigation/CWNavGraph";
import { loginApi } from "../CWlogin.service";

const useLoginViewModel = (navigation: NativeStackNavigationProp<any>) => {
  const login = useCallback(async () => {
    try {
      const response = await loginApi("test@gmail.com", "1234");
      console.log(response);
      navigateTo(
        {
          actionType: ActionType.OPEN_NATIVE,
          destination: AppScreens.LOGIN_OTP_SCREEN,
          params: {},
        },
        navigation
      );
    } catch (e: any) {
      navigateTo(
        {
          actionType: ActionType.OPEN_NATIVE,
          destination: AppScreens.LOGIN_OTP_SCREEN,
          params: {},
        },
        navigation
      );
    }
  }, [navigation]);

  return {
    login,
  };
};

export default useLoginViewModel;

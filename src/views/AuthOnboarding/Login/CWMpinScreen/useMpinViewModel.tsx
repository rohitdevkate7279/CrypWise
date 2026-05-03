import { useCallback, useMemo, useState } from "react";
import { Keyboard } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActionType, navigateTo, navigationBeanObj } from "../../../../navigation/CWNavGraph";
import { AppScreens } from "../../../../navigation/CWNavigationConstants";
import { HeaderType } from "../../../../CWUtilities/CWScreenSlot.Types";
import { SchematicState, Duration } from "../../../../CWComponents/CWToast/CWToast.Types";
import { APIRESPONSE } from "../../../../CWNetworkService/CWApiService";
import { SendOtpResponse } from "../CWLoginScreen/CWlogin.models";
import { loginApi } from "../CWLoginScreen/CWlogin.service";
import { useGlobalState } from "../../../../CWUtilities/CWGlobalStateProvider";
import { signupApi } from "../../CWSignup/CWSignup.service";

const useMpinViewModel = (navigation: NativeStackNavigationProp<any>, route:any) => {
  console.log(route);
  

  const [mpin, setMpin] = useState<string>("")
  const [loading, setIsLoading] = useState<boolean>(false)
  const [mpinError, setMpinError] = useState<boolean>(false)
  const { setToastTypeData } = useGlobalState()

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

  const handleMpinFilled = (mpin: string) => {
    Keyboard.dismiss();
    setMpin(mpin)
  };

  const handleContinue = () => {
    navigateTo(
      {
        actionType: ActionType.OPEN_NATIVE,
        destination: AppScreens.CONFIRM_MPIN_SCREEN,
        headerVisibility: HeaderType.VISIBLE,
        navTitle: "",
        actionUrl: "",
        params: {
          email: route?.params?.params?.formData?.email ?? "",
          name: route?.params?.params?.formData?.firstName + " " + route?.params?.params?.formData?.lastName,
          phone: route?.params?.params?.formData?.mobile ?? "",
          mpin: mpin,
          fromSignupScreen:true
        },
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

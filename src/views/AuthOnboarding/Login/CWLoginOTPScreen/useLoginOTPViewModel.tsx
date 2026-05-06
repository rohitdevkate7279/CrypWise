import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActionType, navigateTo, navigationBeanObj } from "../../../../navigation/CWNavGraph";
import { useMemo, useCallback, useState } from "react";
import { Keyboard } from "react-native";
import { HeaderType } from "../../../../CWUtilities/CWScreenSlot.Types";
import { AppScreens } from "../../../../navigation/CWNavigationConstants";
import { SchematicState, Duration } from "../../../../CWComponents/CWToast/CWToast.Types";
import { APIRESPONSE } from "../../../../CWNetworkService/CWApiService";
import { SendOtpResponse } from "../CWLoginScreen/CWlogin.models";
import { verifyOtpApi } from "./CWLoginOTP.service";
import { useGlobalState } from "../../../../CWUtilities/CWGlobalStateProvider";

const useLoginOTPViewModel = (navigation: NativeStackNavigationProp<any>, route: any) => {
  const { setToastTypeData } = useGlobalState()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const routeData = route?.params?.params ?? {}
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState<boolean>(false)
  const [otpSuccess, setOtpSuccess] = useState<boolean>(false)

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
    verifyOtp(routeData?.email, text);  }, []);

  const handleResendOTP = () => { };

  const handleContinue = () => {
    if (!otp || otp.length !== 6) {
      setOtpError(true);
      return;
    }
  
    verifyOtp(routeData?.email, otp)
  };


  const verifyOtp = useCallback(async (email: string, otp: string) => {
    setIsLoading(true);

    try {
      const response: SendOtpResponse = await verifyOtpApi(email, otp);
      setIsLoading(false);

      if (response?.status_code === APIRESPONSE.SUCCESS) {
        setOtpSuccess(true)
        navigateTo(
          {
            actionType: ActionType.OPEN_NATIVE,
            destination: AppScreens.HOME_SCREEN,
            params: {},
          },
          navigation
        );
      } else {
        setOtpError(true)
        let errMsg =
          response?.message?.trim() || "Invalid OTP";

        setToastTypeData({
          isVisible: true,
          message: errMsg,
          semanticState: SchematicState.ERROR,
          viewStyle: { marginBottom: 105 },
        });
      }
    } catch (e: any) {
      setOtpError(true)
      setIsLoading(false);

      let message =
        e?.message || "Something went wrong";

      setToastTypeData({
        isVisible: true,
        message,
        semanticState: SchematicState.ERROR,
        duration: Duration.SHORT,
        viewStyle: { marginBottom: 105 },
      });
    }
  }, [navigation, setToastTypeData]);

  return {
    navigationBean,
    handleOtpFilled,
    handleResendOTP,
    handleContinue,
    isLoading,
    otp,
    otpError,
    otpSuccess,
    setOtp,
    setOtpError,
    setOtpSuccess
  };
};

export default useLoginOTPViewModel;

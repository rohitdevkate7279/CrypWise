import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { AppScreens } from "../../../../navigation/CWNavigationConstants";
import { navigateTo, ActionType } from "../../../../navigation/CWNavGraph";
import { loginApi } from "./CWlogin.service";
import type { SendOtpResponse } from "./CWlogin.models";
import { APIRESPONSE } from "../../../../CWNetworkService/CWApiService";
import { useGlobalState } from "../../../../CWUtilities/CWGlobalStateProvider";
import { Duration, SchematicState } from "../../../../CWComponents/CWToast/CWToast.Types";

const useLoginViewModel = (navigation: NativeStackNavigationProp<any>) => {
  const [email, setEmail] = useState("");
  const [mpin, setMpin] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [mpinError, setMpinError] = useState(false);
  const { setToastTypeData } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [isAllTextValid, setIsAllTextValid] = useState(false);

  useEffect(() => {
    setIsAllTextValid(email.trim() !== "" && mpin.trim() !== "" && mpin.length === 4 && isValidEmail(email));
  }, [email, mpin]);

  const handleEmailChange = (text: string) => {
    setEmailError(false);
    setEmail(text);
  };

  const handleMpinChange = (text: string) => {
    setMpinError(false);
    setMpin(text);
  };

  // Login API Call
  const login = useCallback(async () => {
    setIsLoading(true);

    if (mpin.length !== 4) {
      setIsLoading(false);
      setMpinError(true);
      return;
    }
    if (!isValidEmail(email)) {
      setIsLoading(false);
      setEmailError(true);
      return;
    }
    try {
      const response: SendOtpResponse = await loginApi(email, mpin);
      setIsLoading(false);
      if (response.status === APIRESPONSE.SUCCESS) {
        navigateTo(
          {
            actionType: ActionType.OPEN_NATIVE,
            destination: AppScreens.LOGIN_OTP_SCREEN,
            params: {},
          },
          navigation
        );
      } else {
        let errMsg = response.message?.trim() || "Something went wrong";

        errMsg.toLowerCase().trim() === "user not found" ? errMsg = "Seems like you’re new here. Sign Up to continue" : errMsg = errMsg;
        setToastTypeData({
          isVisible: true,
          message: errMsg,
          semanticState: SchematicState.ERROR,
          viewStyle: { marginBottom: 105 },
        });
      }
      setTimeout(() => {
        onClickOfSignUp();
      }, 4000);
    } catch (e: unknown) {
      setIsLoading(false);
      let message = thrownErrorMessage(e);
      message.toLowerCase().trim() === "user not found" ? message = "Seems like you’re new here. Sign Up to continue" : message = message;
      setToastTypeData({
        isVisible: true,
        message,
        semanticState: SchematicState.ERROR,
        duration: Duration.SHORT,
        viewStyle: { marginBottom: 105 },
      });
    }
    setTimeout(() => {
      onClickOfSignUp();
    }, 4000);
  }, [navigation, email, mpin, setToastTypeData]);

  const onClickOfSignUp = () => {
    
    navigateTo(
      {
        actionType: ActionType.OPEN_NATIVE,
        destination: AppScreens.SIGNUP_SCREEN,
        params: {},
      },
      navigation
    );
  }
  return {
    login,
    handleEmailChange,
    handleMpinChange,
    email,
    mpin,
    emailError,
    mpinError,
    isLoading,
    isAllTextValid,
    onClickOfSignUp
  };
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function thrownErrorMessage(e: unknown): string {
  if (e instanceof Error) {
    return e.message;
  }
  if (typeof e === "string") {
    return e;
  }
  if (e && typeof e === "object" && "message" in e) {
    const msg = (e as { message?: unknown }).message;
    if (msg != null && String(msg).trim() !== "") {
      return String(msg);
    }
  }
  return "Something went wrong";
}

export default useLoginViewModel;

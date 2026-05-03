import { useCallback, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppScreens } from "../../../../navigation/CWNavigationConstants";
import { HeaderType } from "../../../../CWUtilities/CWScreenSlot.Types";
import { ActionType, navigateTo } from "../../../../navigation/CWNavGraph";
import { SendSignupResponse } from "../../CWSignup/CWSignup.models";
import { APIRESPONSE } from "../../../../CWNetworkService/CWApiService";
import { useGlobalState } from "../../../../CWUtilities/CWGlobalStateProvider";
import { SchematicState, Duration } from "../../../../CWComponents/CWToast/CWToast.Types";
import { signupApi } from "../../CWSignup/CWSignup.service";

const useConfirmMpinViewModel = (navigation: NativeStackNavigationProp<any>, route: any) => {
  const [confirmPin, setConfirmMpin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showAccSuccessPopup, setShowAccSuccessPopup] = useState<boolean>(false);
  const fromSignupScreen = route?.params?.params?.fromSignupScreen ?? false
  const { setToastTypeData } = useGlobalState()
  const [mpinError, setMpinError] = useState<boolean>(false)

  const data = route?.params?.params ?? ""

  const handleConfirmMpin = useCallback((mpin: string) => {
    const isValidLength = mpin.length === 4;
    const isMatching = mpin === data?.mpin;
  
    setConfirmMpin(isValidLength);
    setMpinError(!isMatching);
  
    if (isValidLength && isMatching) {
      login(mpin);
    }
  }, [data]);

  useEffect(() => {
    if (!showAccSuccessPopup) return;

    const timer = setTimeout(() => {
      setShowAccSuccessPopup(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, showAccSuccessPopup]);


  const login = async (mpin:string) => {
    setIsLoading(true);

    try {
      const response: SendSignupResponse = await signupApi(data?.email, mpin, data?.name, data?.phone);
      if (response.status === APIRESPONSE.SUCCESS) {
        setIsLoading(false);
        setShowAccSuccessPopup(true)
        navigateTo(
          {
            actionType: ActionType.OPEN_NATIVE,
            destination: AppScreens.BIOMETRIC_SCREEN,
            headerVisibility: HeaderType.VISIBLE,
            navTitle: "",
            actionUrl: "",
            params: {},
          },
          navigation
        );

      } else {
        setIsLoading(false);
        setToastTypeData({
          isVisible: true,
          message: response.message,
          semanticState: SchematicState.ERROR,
          viewStyle: { marginBottom: 105 },
        });
      }

    } catch (error: any) {
      setIsLoading(false);
      setToastTypeData({
        isVisible: true,
        message: error.message,
        semanticState: SchematicState.ERROR,
        duration: Duration.SHORT,
        viewStyle: { marginBottom: 105 },
      });
    }

  }

  return {
    confirmPin,
    showAccSuccessPopup,
    handleConfirmMpin,
    fromSignupScreen,
    setConfirmMpin,
    isLoading,
    mpinError
  };
};

export default useConfirmMpinViewModel;

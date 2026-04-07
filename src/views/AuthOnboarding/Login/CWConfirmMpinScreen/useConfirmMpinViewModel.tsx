import { useCallback, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppScreens } from "../../../../CWUtilities/CWConstants";
import { HeaderType } from "../../../../CWUtilities/CWScreenSlot.Types";
import { ActionType, navigateTo } from "../../../../navigation/CWNavGraph";

const useConfirmMpinViewModel = (navigation: NativeStackNavigationProp<any>) => {
  const [confirmPin, setConfirmMpin] = useState<boolean>(false);
  const [showMpinSuccessPopup, setShowMpinSuccessPopup] = useState<boolean>(false);

  const handleConfirmMpin = useCallback(() => {
    setConfirmMpin(true);
    setTimeout(() => {
      setShowMpinSuccessPopup(true);
      setConfirmMpin(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!showMpinSuccessPopup) return;

    const timer = setTimeout(() => {
      setShowMpinSuccessPopup(false);
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
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, showMpinSuccessPopup]);

  return {
    confirmPin,
    showMpinSuccessPopup,
    handleConfirmMpin,
  };
};

export default useConfirmMpinViewModel;

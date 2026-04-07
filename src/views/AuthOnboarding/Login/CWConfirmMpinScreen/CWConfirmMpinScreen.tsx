import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import { Animated, Keyboard, Modal, StyleSheet, View } from "react-native";
import CWBlockTextField from "../../../../CWComponents/CWBlockTextField/CWBlockTextField";
import CWButton from "../../../../CWComponents/CWButtons/CWButton";
import CWText from "../../../../CWComponents/CWText/CWText";
import { CWTypography } from "../../../../CWComponents/CWText/CWTextType";
import { AppScreens } from "../../../../CWUtilities/CWConstants";
import ScreenSlot, { DeeplinkHandler } from "../../../../CWUtilities/CWScreenSlot";
import { HeaderType } from "../../../../CWUtilities/CWScreenSlot.Types";
import { NavigationStackData, navigationBeanObj, ActionType } from "../../../../navigation/CWNavGraph";
import { CWButtonState } from "../../../../CWComponents/CWButtons/CWButton.types";
import useConfirmMpinViewModel from "./useConfirmMpinViewModel";

type Props = NativeStackScreenProps<
  NavigationStackData,
  AppScreens.CONFIRM_MPIN_SCREEN
>;

type PopupProps = {
  visible: boolean;
};

const CWConfirmMpinScreen = ({ navigation }: Props) => {
  const { confirmPin, showMpinSuccessPopup, handleConfirmMpin } =
    useConfirmMpinViewModel(navigation);

  const renderContent = (scrollY: Animated.Value) => {
    return (
      <View style={styles.container}>
        <View style={styles.otpContainer}>
          <View style={{ gap: 28 }}>
            <CWText
              text="Confirm your MPIN to protect your digital assets."
              appearance={CWTypography.BODY_L_BOLD}
            />

            <CWBlockTextField
              numberOfDigits={4}
              focusStickBlinkingDuration={500}
              gap={12}
              autoOtp={"true"}
              placeholder="0"
              inputContainer={styles.otpInput}
              onFilled={() => {
                Keyboard.dismiss();
                handleConfirmMpin();
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CWButton
              title="Continue"
              state={!confirmPin ? CWButtonState.NORMAL : CWButtonState.LOADING}
              onPress={() => {}}
            />
          </View>
        </View>
        {showMpinSuccessPopup && <MPINSuccessPopup visible={showMpinSuccessPopup} />}
      </View>
    );
  };

  const MPINSuccessPopup = ({ visible }: PopupProps) => {
    return (
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.card}>
            <LottieView
              source={require("../../../../CWAssets/purpleTick.json")}
              autoPlay
              loop={false}
              style={styles.popuplottie}
            />

            <CWText
              text="Your MPIN has been saved"
              appearance={CWTypography.HEADING_S}
              textAlign="center"
              color={"black"}
              style={{ marginTop: -16 }}
            />

            <CWText
              text="You can change your MPIN in Profile > Change MPIN"
              appearance={CWTypography.BODY_S}
              textAlign="center"
              color={"primary_70"}
              style={{ marginTop: 4 }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <DeeplinkHandler
      navigationBean={navigationBeanObj({
        actionType: ActionType.OPEN_NATIVE,
        destination: "",
        actionUrl: "",
        userAuthenticationRequired: 1,
        headerVisibility: HeaderType.VISIBLE,
        navTitle: "Verify Your MPIN",
      })}
      navigation={navigation}
    >
      {(bean) => (
        <ScreenSlot navigationBean={bean} navigation={navigation}>
          {(authState, scrollY) => {
            return renderContent(scrollY);
          }}
        </ScreenSlot>
      )}
    </DeeplinkHandler>
  );
};

export default CWConfirmMpinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  topSection: {
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  otpContainer: {
    flex: 1,
    marginTop: 24,
    justifyContent: "space-between",
  },
  otpInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 120,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  lottie: {
    width: 250,
    height: 250,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  popuplottie: {
    width: 150,
    height: 150,
    marginTop: -16,
  },
});

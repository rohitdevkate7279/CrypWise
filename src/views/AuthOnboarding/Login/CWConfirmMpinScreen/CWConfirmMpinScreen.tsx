import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import { Animated, Keyboard, Modal, StyleSheet, View } from "react-native";
import CWBlockTextField from "../../../../CWComponents/CWBlockTextField/CWBlockTextField";
import CWButton from "../../../../CWComponents/CWButtons/CWButton";
import { CWTypography } from "../../../../CWComponents/CWText/CWTextType";
import { AppScreens } from "../../../../navigation/CWNavigationConstants";
import ScreenSlot, { DeeplinkHandler } from "../../../../CWUtilities/CWScreenSlot";
import { HeaderType } from "../../../../CWUtilities/CWScreenSlot.Types";
import { NavigationStackData, navigationBeanObj, ActionType } from "../../../../navigation/CWNavGraph";
import { CWButtonState } from "../../../../CWComponents/CWButtons/CWButton.types";
import useConfirmMpinViewModel from "./useConfirmMpinViewModel";
import CWText from "../../../../CWComponents/CWText/CWText";
import { FeedbackState } from "../../../../CWUtilities/Feedback";

type Props = NativeStackScreenProps<
  NavigationStackData,
  AppScreens.CONFIRM_MPIN_SCREEN
>;

type PopupProps = {
  visible: boolean;
};

const CWConfirmMpinScreen = ({ navigation, route }: Props) => {

  const { confirmPin, showAccSuccessPopup, handleConfirmMpin, fromSignupScreen, isLoading, mpinError, setMpinError } =
    useConfirmMpinViewModel(navigation, route);

  const renderContent = (scrollY: Animated.Value) => {
    return (
      <View style={styles.container}>
        <View style={styles.otpContainer}>
          <View style={{ gap: 28 }}>
            <CWText
              text={fromSignupScreen ? "Verify your MPIN to securely complete your Crypwise account setup." : "Confirm your MPIN to protect your digital assets."}
              appearance={CWTypography.BODY_L_BOLD}
            />

            <CWBlockTextField
              numberOfDigits={4}
              focusStickBlinkingDuration={500}
              gap={12}
              autoOtp={"true"}
              placeholder="0"
              inputContainer={styles.otpInput}
              onTextChange={(text) => {
                if (mpinError && text.length < 4) {
                  setMpinError(false);
                }
              }}
              onFilled={(mpin) => {
                Keyboard.dismiss();
                handleConfirmMpin(mpin);
              }}
              state={mpinError ? FeedbackState.ERROR : FeedbackState.CLEAR}
              stateMessage="Mpin not match"
            />
          </View>

          <View style={styles.buttonContainer}>
            <CWButton
              title="Continue"
              state={isLoading ? CWButtonState.LOADING : confirmPin ? CWButtonState.NORMAL : CWButtonState.DISABLED}
              onPress={() => { }}
            />
          </View>
        </View>
        {showAccSuccessPopup && <AccountSuccessPopup visible={showAccSuccessPopup} />}
      </View>
    );
  };

  const AccountSuccessPopup = ({ visible }: PopupProps) => {
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
              text="Your Crypwise account is ready to go."
              appearance={CWTypography.HEADING_S}
              textAlign="center"
              color={"black"}
              style={{ marginTop: -16 }}
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
        <ScreenSlot navigationBean={bean} navigation={navigation} disableBack showBack={false}>
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

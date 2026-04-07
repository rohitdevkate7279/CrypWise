import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Animated, View, StyleSheet } from "react-native";
import CWBlockTextField from "../../../../CWComponents/CWBlockTextField/CWBlockTextField";
import CWButton from "../../../../CWComponents/CWButtons/CWButton";
import CWText from "../../../../CWComponents/CWText/CWText";
import { CWTypography } from "../../../../CWComponents/CWText/CWTextType";
import { AppScreens } from "../../../../CWUtilities/CWConstants";
import ScreenSlot, { DeeplinkHandler } from "../../../../CWUtilities/CWScreenSlot";
import { NavigationStackData } from "../../../../navigation/CWNavGraph";
import LottieView from "lottie-react-native";
import useMpinViewModel from "./useMpinViewModel";

type Props = NativeStackScreenProps<NavigationStackData, AppScreens.MPIN_SCREEN>;

const CWMpinScreen = ({ navigation }: Props) => {
  const { navigationBean, handleMpinFilled, handleContinue } = useMpinViewModel(navigation);

  const renderContent = (scrollY: Animated.Value) => {
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <LottieView
            source={require("../../../../CWAssets/CyberSecurity.json")}
            autoPlay
            loop
            resizeMode="contain"
            style={styles.lottie}
          />
        </View>

        <View style={styles.otpContainer}>
          <View style={{ gap: 24 }}>
            <CWBlockTextField
              numberOfDigits={4}
              focusStickBlinkingDuration={500}
              gap={12}
              autoOtp={"true"}
              placeholder="0"
              inputContainer={styles.otpInput}
              onFilled={handleMpinFilled}
              secureTextEntry
            />
            <CWText
              text="Create your MPIN to unlock CrypWise safely."
              textAlign="center"
              appearance={CWTypography.BODY_M_BOLD}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CWButton title="Continue" onPress={handleContinue} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <DeeplinkHandler navigationBean={navigationBean} navigation={navigation}>
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

export default CWMpinScreen;

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
});

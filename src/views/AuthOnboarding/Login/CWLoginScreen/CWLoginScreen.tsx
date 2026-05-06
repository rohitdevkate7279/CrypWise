import React from "react";
import { View, StyleSheet, Animated, Image, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActionType, navigationBeanObj, NavigationStackData } from "../../../../navigation/CWNavGraph";
import { AppScreens } from "../../../../navigation/CWNavigationConstants";
import CWText from "../../../../CWComponents/CWText/CWText";
import CWScrollView from "../../../../CWComponents/CWScrollView";
import ScreenSlot, { DeeplinkHandler } from "../../../../CWUtilities/CWScreenSlot";
import { HeaderType } from "../../../../CWUtilities/CWScreenSlot.Types";
import { CWTypography } from "../../../../CWComponents/CWText/CWTextType";
import CWTextInput, { CWTextInputState } from "../../../../CWComponents/CWTextInput";
import CWButton from "../../../../CWComponents/CWButtons/CWButton";
import useLoginViewModel from "./useLoginViewModel";
import { CWButtonState } from "../../../../CWComponents/CWButtons/CWButton.types";
import CWBlockTextField from "../../../../CWComponents/CWBlockTextField/CWBlockTextField";
import { FeedbackState } from "../../../../CWUtilities/Feedback";
import { useColors } from "../../../../theme/CWCustomTokenProvider";

type Props = NativeStackScreenProps<NavigationStackData, AppScreens.LOGIN_SCREEN>;

const CWLoginScreen = ({ navigation, route }: Props) => {
  const {
    login,
    handleEmailChange,
    handleMpinChange,
    email,
    isLoading,
    emailError,
    mpinError,
    isAllTextValid,
    onClickOfSignUp
  } = useLoginViewModel(navigation);

  const schemeMainUi = (scrollY: Animated.Value) => {
    const color = useColors()
    return (
      <CWScrollView scrollY={scrollY} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <CWText
              text="Welcome back!"
              appearance={CWTypography.HEADING_M}
              style={{ marginBottom: 12 }}
            />
            <CWText
              text="Good to see you again"
              appearance={CWTypography.HEADING_S}
              style={{ marginBottom: 32 }}
            />

            <CWText
              text="Enter your credentials"
              appearance={CWTypography.BODY_M}
              style={{ marginBottom: 8 }}
              color={"primary_inverse"}
              textAlign="center"

            />
            <View style={{ gap: 24, marginBottom: 32 }}>

              <View style={{ gap: 8 }} >
                <CWText
                  text="Email"
                  appearance={CWTypography.BODY_M_BOLD}
                  style={{}}
                />
                <CWTextInput
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder="Enter Your email"
                  errorText={emailError ? "Enter valid email" : ""}
                  state={emailError ? CWTextInputState.ERROR : CWTextInputState.NORMAL}
                />
              </View>

              <View style={{ gap: 8 }} >

                <CWText
                  text="Enter Your MPin"
                  appearance={CWTypography.BODY_M_BOLD}
                  style={{}}
                />

                <CWBlockTextField
                  numberOfDigits={4}
                  focusStickBlinkingDuration={500}
                  gap={12}
                  placeholder="0"
                  inputContainer={styles.otpInput}
                  onFilled={handleMpinChange}
                  stateMessage="Incorrect MPin"
                  state={mpinError ? FeedbackState.ERROR : FeedbackState.CLEAR}
                  secureTextEntry
                  autoFocus={false}
                />

                <Pressable onPress={() => { }}>
                  <CWText
                    text="Forget MPin?"
                    appearance={CWTypography.BODY_S_BOLD}
                    color={"primary_link"}
                    textAlign="right"
                  />
                </Pressable>

              </View>

            </View>
            <CWButton
              title="Verify"
              onPress={() => {
                login();
              }}
              state={!isAllTextValid ? CWButtonState.DISABLED : isLoading ? CWButtonState.LOADING : CWButtonState.NORMAL}
            />
          </View>

          <View style={{ marginBottom: 24, alignItems: "center", justifyContent: "center", gap: 12 }}>
            <View style={{}}>
              <View style={styles.dividerRow}>
                <View style={[styles.line, { backgroundColor: color.grey_20 }]} />
                <CWText
                  text="Or continue with"
                  style={styles.text}
                />
                <View style={[styles.line, { backgroundColor: color.grey_20 }]} />
              </View>
            </View>
            <Pressable onPress={() => { }}>
              <Image
                source={require("../../../../CWAssets/GoogleSSO.png")}
                style={{ height: 45 }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>

        <View style={{ alignItems: "center", marginBottom: 24, flexDirection: 'row', justifyContent: 'center' }}>
          <CWText
            text="Don't have an account?  "
            color={"primary_inverse"}
          />
          <Pressable onPress={() => onClickOfSignUp()}>
            <CWText
              text="Sign Up"
              color={"primary_link"}
            />
          </Pressable>
        </View>
      </CWScrollView>
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
        navTitle: "",
      })}
      navigation={navigation}
    >
      {(bean) => (
        <ScreenSlot navigationBean={bean} navigation={navigation} showBack={true}>
          {(authState, scrollY) => {
            return schemeMainUi(scrollY);
          }}
        </ScreenSlot>
      )}
    </DeeplinkHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  otpInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 120,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  line: {
    flex: 1,
    height: 1,
  },

  text: {
    marginHorizontal: 12,
    color: "#888",
    fontSize: 14,
  },
});

export default CWLoginScreen;

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

type Props = NativeStackScreenProps<NavigationStackData, AppScreens.LOGIN_SCREEN>;

const CWLoginScreen = ({ navigation, route }: Props) => {
  const {
    login,
    handleEmailChange,
    handleMpinChange,
    email,
    mpin,
    isLoading,
    emailError,
    mpinError,
    isAllTextValid,
    onClickOfSignUp
  } = useLoginViewModel(navigation);

  const schemeMainUi = (scrollY: Animated.Value) => {
    return (
      <CWScrollView scrollY={scrollY} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-between", paddingVertical: 24 }}>
          <View style={{ flex: 1 }}>
            <CWText
              text="getting started"
              appearance={CWTypography.HEADING_M}
              textAlign="center"
              style={{ marginBottom: 72 }}
            />

            <View style={{ gap: 12 }}>
              <CWTextInput
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Enter Your email"
                errorText={emailError ? "Enter valid email" : ""}
                state={emailError ? CWTextInputState.ERROR : CWTextInputState.NORMAL}
              />
              <CWTextInput
                value={mpin}
                onChangeText={handleMpinChange}
                placeholder="Enter 4 digit Mpin"
                keyboardType="number-pad"
                maxLength={4}
                errorText={mpinError ? "Enter valid mpin" : ""}
                state={mpinError ? CWTextInputState.ERROR : CWTextInputState.NORMAL}
              />

              <CWButton
                title="Verify"
                onPress={() => {
                  login();
                }}
                state={!isAllTextValid ? CWButtonState.DISABLED : isLoading ? CWButtonState.LOADING : CWButtonState.NORMAL}
              />
            </View>
          </View>

          <View style={{ marginBottom: 24, alignItems: "center", justifyContent: "center", gap: 12 }}>
            <CWText text="Or Continue With" />
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
          <Pressable onPress={()=>onClickOfSignUp()}>
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
});

export default CWLoginScreen;

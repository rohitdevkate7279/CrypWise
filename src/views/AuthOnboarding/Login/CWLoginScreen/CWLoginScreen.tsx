import React from "react";
import { View, StyleSheet, Animated, Image, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActionType, navigationBeanObj, NavigationStackData } from "../../../../navigation/CWNavGraph";
import { AppScreens } from "../../../../CWUtilities/CWConstants";
import CWText from "../../../../CWComponents/CWText/CWText";
import CWScrollView from "../../../../CWComponents/CWScrollView";
import ScreenSlot, { DeeplinkHandler } from "../../../../CWUtilities/CWScreenSlot";
import { HeaderType } from "../../../../CWUtilities/CWScreenSlot.Types";
import { CWTypography } from "../../../../CWComponents/CWText/CWTextType";
import CWTextInput from "../../../../CWComponents/CWTextInput";
import CWButton from "../../../../CWComponents/CWButtons/CWButton";
import useLoginViewModel from "./useLoginViewModel";

type Props = NativeStackScreenProps<NavigationStackData, AppScreens.LOGIN_SCREEN>;

const CWLoginScreen = ({ navigation }: Props) => {
  const { login } = useLoginViewModel(navigation);

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
              <CWTextInput onChangeText={(val) => console.log(val)} placeholder="Enter Your email" />
              <CWButton
                title="Verify"
                onPress={() => {
                  login();
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 24, alignItems: "center", justifyContent: "center", gap: 12 }}>
            <CWText text="Or continue with" />
            <Pressable onPress={() => {}}>
              <Image
                source={require("../../../../CWAssets/GoogleSSO.png")}
                style={{ height: 45 }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>

        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <CWText
            text="By creating an account you agree to our Terms and Conditions"
            textAlign="center"
            color={"primary_inverse"}
          />
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

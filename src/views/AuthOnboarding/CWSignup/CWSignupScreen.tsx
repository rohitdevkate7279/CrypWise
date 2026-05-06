import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActionType, navigationBeanObj, NavigationStackData } from "../../../navigation/CWNavGraph";
import { AppScreens } from "../../../navigation/CWNavigationConstants";
import ScreenSlot, { DeeplinkHandler, MoveKeyboardUpWithButton, MoveKeyboardUpWithoutButton } from "../../../CWUtilities/CWScreenSlot";
import { HeaderType } from "../../../CWUtilities/CWScreenSlot.Types";
import { Animated, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import CWText from "../../../CWComponents/CWText/CWText";
import { CWTypography } from "../../../CWComponents/CWText/CWTextType";
import CWTextInput, { CWTextInputState } from "../../../CWComponents/CWTextInput";
import CWButton from "../../../CWComponents/CWButtons/CWButton";
import { useState } from "react";
import CWSignupScreenViewModel from "./CWSignupScreenViewModel";
import { CWButtonState } from "../../../CWComponents/CWButtons/CWButton.types";

type Props = NativeStackScreenProps<NavigationStackData, AppScreens.SIGNUP_SCREEN>;

const CWSignupScreen = ({ navigation, route }: Props) => {

  const { handleSubmit,
    handleChange,
    errors,
    isLoading
  } = CWSignupScreenViewModel(navigation)

  const schemeMainUi = (scrollY: Animated.Value) => {

    const translateY = scrollY.interpolate({
      inputRange: [0, 150],
      outputRange: [0, -50],
      extrapolate: "clamp",
    });

    return (
      <><MoveKeyboardUpWithButton nativeResize={Platform.OS === 'ios' ? false : true}>     
         <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )} contentContainerStyle={{ justifyContent: "center" }}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        style={[styles.container, { transform: [{ translateY }] }]}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <CWText text={"Join thousands of professionals using"}
            appearance={CWTypography.HEADING_S}
            textAlign="center" />
          <CWText text={"Crypwise App"}
            appearance={CWTypography.HEADING_S}
            textAlign="center"
            color={"primary_50"} />
        </View>
        <View style={styles.textContainer}>
          <View style={{ gap: 8 }} >
            <CWText
              text="First Name"
              appearance={CWTypography.BODY_M_BOLD}
              style={{}}
            />
            <CWTextInput placeholder={"First Name"} onChangeText={(text) => handleChange("firstName", text)} state={errors.firstName ? CWTextInputState.ERROR : CWTextInputState.NORMAL} errorText={errors.firstName} />
          </View>

          <View style={{ gap: 8 }} >
            <CWText
              text="Last Name"
              appearance={CWTypography.BODY_M_BOLD}
              style={{}}
            />
            <CWTextInput placeholder={"Last Name"} onChangeText={(text) => handleChange("lastName", text)} state={errors.lastName ? CWTextInputState.ERROR : CWTextInputState.NORMAL} errorText={errors.lastName} />
          </View>

          <View style={{ gap: 8 }} >
            <CWText
              text="Email"
              appearance={CWTypography.BODY_M_BOLD}
              style={{}}
            />
            <CWTextInput placeholder={"Email"} keyboardType="email-address" onChangeText={(text) => handleChange("email", text)} state={errors.email ? CWTextInputState.ERROR : CWTextInputState.NORMAL} errorText={errors.email} />
          </View>

          <View style={{ gap: 8 }} >
            <CWText
              text="Mobile"
              appearance={CWTypography.BODY_M_BOLD}
              style={{}}
            />
            <CWTextInput placeholder={"Mobile"} keyboardType={"number-pad"} maxLength={10} onChangeText={(text) => handleChange("mobile", text)} state={errors.mobile ? CWTextInputState.ERROR : CWTextInputState.NORMAL} errorText={errors.mobile} />
          </View>

        </View>
      </Animated.ScrollView>
      </MoveKeyboardUpWithButton>
        <View>
          <CWButton title="Continue" onPress={() => handleSubmit()} state={isLoading ? CWButtonState.LOADING : CWButtonState.NORMAL} />
        </View></>

    )
  }

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
}

const styles = StyleSheet.create({
  container: {
  },
  textContainer: {
    marginTop: 48,
    gap: 16
  }
})

export default CWSignupScreen;
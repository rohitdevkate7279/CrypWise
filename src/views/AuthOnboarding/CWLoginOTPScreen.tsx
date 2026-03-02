import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Animated, Keyboard, StyleSheet, View } from "react-native";
import { AppScreens } from "../../CWUtilities/CWConstants";
import { useGlobalState } from "../../CWUtilities/CWGlobalStateProvider";
import ScreenSlot, { DeeplinkHandler } from "../../CWUtilities/CWScreenSlot";
import { HeaderType } from "../../CWUtilities/CWScreenSlot.Types";
import { NavigationStackData, navigationBeanObj, ActionType } from "../../navigation/CWNavGraph";
import CWBlockTextField from "../../CWComponents/CWBlockTextField/CWBlockTextField";
import { FeedbackState } from "../../CWUtilities/Feedback";
import CWText from "../../CWComponents/CWText/CWText";
import { CWTypography } from "../../CWComponents/CWText/CWTextType";
import CWButton from "../../CWComponents/CWButtons/CWButton";

type Props = NativeStackScreenProps<NavigationStackData, AppScreens.LOGIN_OTP_SCREEN>;

const CWLoginOTPScreen = ({ navigation, route }: Props) => {
  const { setToastTypeData } = useGlobalState()

  const schemeMainUi = (scrollY: Animated.Value) => {
    return (

      <View style={{ flex: 1, justifyContent: 'space-between' }}>

        <View style={{ gap: 8 }}>
          <CWText text="Enter 4-digit Code" textAlign="center" appearance={CWTypography.HEADING_S} color={'primary_inverse'} />
          <CWText text="We've sent code to ***@gmail.com" textAlign="center" appearance={CWTypography.BODY_M_BOLD} />
          <View style={{ marginTop: 60 }}>
            <CWBlockTextField
              numberOfDigits={4}
              focusStickBlinkingDuration={500}
              gap={12}
              autoOtp={"true"}
              placeholder='0'
              inputContainer={{ flex: 1, borderWidth: 1, borderRadius: 12 }}
              // onTextChange={handleTextChange}
              onFilled={text => {
                Keyboard.dismiss()
              }}
            // state={FeedbackState.ERROR}
            stateMessage={"Incorrect OTP"}
            />
            <CWText text="Didn't get OTP?" textAlign="center" appearance={CWTypography.BODY_M_BOLD} style={{ marginTop: 24 }} />

            <CWText text="Resend Code" textAlign="center" appearance={CWTypography.BODY_M_BOLD} color={'primary_50'} style={{ marginTop: 8 }} />
          </View>
        </View>

        <View style={{marginBottom:24}}>
<CWButton title="Continue" />
        </View>
      </View>
    );
  }


  return (
    <>
      <DeeplinkHandler
        navigationBean={navigationBeanObj({
          actionType: ActionType.OPEN_NATIVE,
          destination: "",
          actionUrl: '',
          userAuthenticationRequired: 1,
          headerVisibility: HeaderType.HIDDEN,
        })}
        navigation={navigation}>
        {bean => (
          <ScreenSlot
            navigationBean={bean}
            navigation={navigation}
            showBack={true}
          >
            {(authState, scrollY) => {
              switch (authState) {
                default:
                  return schemeMainUi(scrollY);
              }
            }}
          </ScreenSlot>
        )}
      </DeeplinkHandler>
    </>
  );







};

const styles = StyleSheet.create({

});

export default CWLoginOTPScreen;


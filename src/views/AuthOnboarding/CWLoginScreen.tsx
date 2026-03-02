import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, TextInput, Image, Pressable } from 'react-native';
import { useColors } from '../../theme/CWCustomTokenProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActionType, navigateTo, navigationBeanObj, NavigationStackData } from '../../navigation/CWNavGraph';
import { AppScreens } from '../../CWUtilities/CWConstants';
import CWHeader from '../../CWComponents/CWHeader/CWHeader';
import CWText from '../../CWComponents/CWText/CWText';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CWScrollView from '../../CWComponents/CWScrollView';
import { AuthState } from '../../CWUtilities/CWAuthTypes';
import ScreenSlot, { DeeplinkHandler, userAuthenticationErrorState, userAuthenticationLoadingState } from '../../CWUtilities/CWScreenSlot';
import { HeaderType } from '../../CWUtilities/CWScreenSlot.Types';
import { CWTypography } from '../../CWComponents/CWText/CWTextType';
import CWTextInput from '../../CWComponents/CWTextInput';
import CWButton from '../../CWComponents/CWButtons/CWButton';
import { APIHttpMethod } from '../../CWNetworkService/CWAPIModel';
import { ApiService } from '../../CWNetworkService/CWApiService';
import { Duration, SchematicState, ToastType } from '../../CWComponents/CWToast/CWToast.Types';
import { useGlobalState } from '../../CWUtilities/CWGlobalStateProvider';

type Props = NativeStackScreenProps<NavigationStackData, AppScreens.LOGIN_SCREEN>;

const CWLoginScreen = ({ navigation, route }: Props) => {
  const { setToastTypeData } = useGlobalState()
  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const payload = {
      email: "test@gmail.com",
      m_pin: 1234,
    };

    try {
      const response = await ApiService({
        busiCode: "auth/send-otp",
        method: APIHttpMethod.POST,
        busiParams: payload,
      });

    } catch (error: any) {
      setToastTypeData({
        isVisible: true,
        message: error?.message,
        semanticState: SchematicState.ERROR,
        viewStyle: { marginBottom: 105 }
      });
    }
  }

  const schemeMainUi = (scrollY: Animated.Value) => {
    return (

      <CWScrollView scrollY={scrollY} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 24 }}>

          <View style={{ flex: 1 }}>
            <CWText
              text="getting started"
              appearance={CWTypography.HEADING_M}
              textAlign="center"
              style={{ marginBottom: 72 }}
            />

            <View style={{ gap: 12 }}>
              <CWTextInput
                onChangeText={(val) => console.log(val)}
                placeholder="Enter Your email"
              />
              <CWButton title="Verify" 
              onPress={()=>{
                navigateTo({
                    actionType: ActionType.OPEN_NATIVE,
                    destination: AppScreens.LOGIN_OTP_SCREEN,
                    params: {
                    }
                }, navigation)
            }}/>

            </View>
          </View>

          <View style={{ marginBottom: 24, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <CWText text='Or continue with' />
            <Pressable onPress={() => { }}>

              <Image
                source={require('../../CWAssets/GoogleSSO.png')}
                style={{ height: 45 }}
                resizeMode="contain"
              />

            </Pressable>

          </View>

        </View>

        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <CWText text='By creating an account you agree to our Terms and Conditions' textAlign='center' color={'primary_inverse'} />

        </View>


      </CWScrollView>

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
          headerVisibility: HeaderType.VISIBLE,
          navTitle: "",
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
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CWLoginScreen;


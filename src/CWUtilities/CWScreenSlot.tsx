import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect, JSX, useRef, useCallback } from "react";
import { View, Text, Keyboard, KeyboardAvoidingView, Platform, NativeEventSubscription, BackHandler, Dimensions, Animated, StyleSheet, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SchematicState, Duration } from "../CWComponents/CWToast/CWToast.Types";
import { AuthState } from "./CWAuthTypes";
import CWLoader from "../CWComponents/CWLoader/CWLoader";
import { DeeplinkProps, HeaderType, KeyboardProps, ScreenSlotProps } from "./CWScreenSlot.Types";
import { navigateTo, ActionType } from "../navigation/CWNavGraph";
import { AppScreens } from "./CWConstants";
import { CWSharedViewModel } from "./CWSharedViewModel";
import CWHeader from "../CWComponents/CWHeader/CWHeader";
import CWToast from "../CWComponents/CWToast/CWToast";
import { useGlobalState } from "./CWGlobalStateProvider";
import { useColors } from "../theme/CWCustomTokenProvider";

export const userAuthenticationErrorState = () => {
  return (
    <View>
      <Text>Authentication failed</Text>
    </View>
  );
};
export const userAuthenticationLoadingState = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: useColors().primary_background }}>
      <CWLoader />
    </View>
  );
};

export const MoveKeyboardUpWithButton: React.FC<KeyboardProps> = ({
  children,
  nativeResize,
  behavior,
}) => {

  const [keyboardVisible, setKeyboardVisible] = useState(false)
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
    })
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow')
      Keyboard.removeAllListeners('keyboardDidHide')
    }
  }, [])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={behavior || Platform.OS === 'ios' ? 'padding' : !keyboardVisible ? undefined : 'height'}>
      <>
        {children}
      </>
    </KeyboardAvoidingView>
  );
};

export const MoveKeyboardUpWithoutButton: React.FC<KeyboardProps> = ({
  children,
  nativeResize,
}) => {

  if (Platform.OS === 'android') {
    return (
      <MoveKeyboardUpWithButton nativeResize={nativeResize}>
        {children}
      </MoveKeyboardUpWithButton>
    );
  } else {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled={false}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoidingView>
    );
  }
};

export function DeeplinkHandler(props: DeeplinkProps): JSX.Element {

  if (props.navigationBean)
    return <>{props?.children ? props.children(props.navigationBean) : null}</>;
  else
    return <></>
}




function ScreenSlot(props: ScreenSlotProps) {
  const {
    userAuthenticationStatus,
    setUserAuthenticationStatus,
    toastTypeData,
    setToastTypeData,
    failureRetryToast,
    setFailureRetryToast,
    exitInvest,
    setExitInvest
  } = useGlobalState();

  const navigation = props?.navigation;
  const insets = useSafeAreaInsets();
  const [drawer, setDrawer] = useState(false)
  const [drawerClosing, setdrawerClosing] = useState(false)
  const drawerRef = useRef(false);
  // const jsonAppText = getAppTextContent()
  const disableBack = useRef(props.disableBack);
  const scrollY = React.useRef(new Animated.Value(0)).current


  let backHandler: NativeEventSubscription

  const onBackPress = useCallback(() => {
    setToastTypeData(undefined);
    console.log(drawerRef.current, 'drawerRef')

    // Check if back press should be disabled due to failureRetryToast
    if (failureRetryToast !== undefined && failureRetryToast.disableBackPress) {
      return true;
    }

    if (disableBack.current) {
      return true
    }

    if (drawerRef.current) {
      setdrawerClosing(true)
      setDrawer(false);
      drawerRef.current = false
      return true
    }


    if (props?.navigationBean?.params?.fireGAForBackPress) {
      // AnalyticsUtility.Instance.callFirebaseAnalytics({
      //   event: props?.navigationBean?.params?.gaBackEvent?.event ?? '',
      //   action: 'back',
      //   label: props?.navigationBean?.params?.gaBackEvent?.label ?? '',
      // });
    }

    if (props.isLoading) {
      return true;
    }

    if (Keyboard.isVisible() && !props.showClose) {
      Keyboard.dismiss();
    }
    // handling showClose functionality of cross from system back press
    else if (props.goToDahboard) {
      // Navigate to dashboard when system back is pressed
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{
            name: AppScreens.MAINSTACK,
          }],
        });
      }, 50);
      return true;
    }
    else if (navigation?.canGoBack() && props?.navigationBean?.destination != AppScreens.ENTER_MPIN) {
      console.log("in goback")

      if (props.clearDataAndGoBack) {
        props.clearDataAndGoBack();
      }
      else if (props.onCustomBackPress) {
        props.onCustomBackPress?.();
      }
      else {

        if (props.navigationBean.showBnb && props.navigationBean.destination != AppScreens.MAINSTACK) {
          navigation.popToTop();
          return true
        }

        if (props.navigationBean.destination === AppScreens.MAINSTACK) {
          if (BackHandleUtility.Instance.callBackPress != undefined) {
            setExitInvest(true)
            setTimeout(() => {
              setExitInvest(false)
              BackHandleUtility.Instance.callBackPress()

            }, 2000)
          }
          else {
            // networkService.stopMonitoring();
            BackHandler.exitApp();
          }
        }
        else {
          navigation.goBack();
        }
      }
    } else {

      console.log("in exit")
      if (BackHandleUtility.Instance.callBackPress != undefined) {
        setExitInvest(true)
        setTimeout(() => {
          setExitInvest(false)
          BackHandleUtility.Instance.callBackPress()
        }, 2000)
      }
      else {
        // networkService.stopMonitoring();
        BackHandler.exitApp();
      }
    }
    props.onBackPressCallback?.();
    return true;
  }, []);

  useEffect(() => {
    disableBack.current = props.disableBack;
  }, [props.disableBack]);

  useEffect(() => {
    if (exitInvest) {
      // moveKeyboard(0)
      // Platform.OS === 'ios' ? shouldRegisterIQKeyboardJFS(true) : jfsImePaddingFlagAndroid(true);
      // BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }
  }, [exitInvest])


  useEffect(() => {
    props.onVisible?.();
    if (props?.navigationBean?.userAuthenticationRequired !== 0) {
      if (
        CWSharedViewModel.Instance.userAuthenticationStatus ===
        AuthState.VALIDATE_USER
      ) {
        // setToastTypeData(genericToastTypeData(GenericToast.FETCHING_DETAILS));
      }
      // const onCompletion = (changeUserStatus: boolean, error?: string, showErrorToast: boolean = true) => {
      //   if (changeUserStatus) {
      //     setUserAuthenticationStatus(
      //       CWSharedViewModel.Instance.userAuthenticationStatus,
      //     );
      //     if (
      //       CWSharedViewModel.Instance.userAuthenticationStatus ===
      //       AuthState.AUTHENTICATED
      //     ) {
      //       setToastTypeData(undefined);
      //     }
      //   } else {
      //     // redirectToLoginScreen(navigation)
      //     if (showErrorToast) {
      //       setToastTypeData({
      //         isVisible: true,
      //         message: error || '',
      //         semanticState: SchematicState.ERROR,
      //         duration: Duration.SHORT,
      //         disableScreenTouch: false,
      //       });
      //     }
      //   }
      // };
      // CWSharedViewModel.Instance.initializeUserAuthentication(onCompletion, setFailureRetryToast);
    }
  }, []);


  useFocusEffect(
    useCallback(() => {

      if (props.navigationBean.destination !== AppScreens.INTROSCREEN && props.navigationBean.destination !== AppScreens.COMMON_WEB_VIEW) {
        backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          onBackPress,
        );
        return () => {
          console.debug('screen slot removed');

          backHandler.remove();
        };
      }
    }, []),
  );


  useEffect(() => {
    // Hide keyboard when toastTypeData is defined (i.e., when the toast is visible)
    if (toastTypeData !== undefined) {
      Keyboard?.dismiss();
    }
  }, [toastTypeData]);


  function getLocalUserAuthStatus(
    userAuthenticationStatus: AuthState,
  ): AuthState {

    if (
      (props?.navigationBean?.userAuthenticationRequired === 1 &&
        userAuthenticationStatus === AuthState.SESSION_CREATED) ||
      props?.navigationBean?.userAuthenticationRequired === 0
    ) {
      return AuthState.AUTHENTICATED;
    }
    return userAuthenticationStatus;
  }


  // const openDrawer = () => {
  //   drawerRef.current = true
  //   console.log(drawerRef.current, 'drawerRef>>>')
  //   setDrawer(true);
  // };
  const screenWidth = Dimensions.get('window').width;
  // const translateX = useRef(new Animated.Value(screenWidth)).current; // Start off-screen to the right (500px off-screen)


  // useEffect(() => {
  //   if (drawer) {
  //     // Slide the drawer in from the right
  //     Animated.timing(translateX, {
  //       toValue: 0,  // Move to original position
  //       duration: 300,  // Customize the duration
  //       useNativeDriver: true,
  //     }).start();
  //   } else {
  //     // Slide the drawer out to the right
  //     if (drawerClosing) {
  //       Animated.timing(translateX, {
  //         toValue: screenWidth,  // Move off-screen to the right
  //         duration: 300,
  //         useNativeDriver: true,
  //       }).start();
  //     }
  //   }
  // }, [drawer]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          pointerEvents: props.isLoading
            ? 'none'
            : toastTypeData && toastTypeData.disableScreenTouch
              ? 'none'
              : failureRetryToast && failureRetryToast.disableScreenTouch ? 'none' : 'auto',
        }}>
        {(props?.navigationBean?.params?.showStatusBar ?? true) && (
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />)}
        {props?.navigationBean?.headerVisibility === HeaderType.VISIBLE && (
          <CWHeader
            scrollY={scrollY}
            showBack={props?.navigationBean?.params?.showBack ?? props.showBack ?? true}
            // showHelp={props?.navigationBean?.showHelp ?? props.showHelp ?? false}
            // showClose={props?.navigationBean?.params?.showClose ?? false}
            // showMore={props?.showMore ?? false}
            title={props?.navigationBean?.navTitle ?? ''}
            showNotification={props?.showNotification ?? false}
            onBackPress={() => {
              onBackPress()
            }}
          // onPressOfClose={onBackPress}
          // onsuffixClick={props.onsuffixClick}
          // onClickOfHelp={props?.navigationBean?.params?.onClickOfHelp ?? onClickOfHelp}
          />
        )}
        {
          <View style={{ flex: 1, backgroundColor: useColors().primary_background, paddingTop: insets.top + 56, paddingHorizontal: 24, paddingBottom: 24 }}>
            {props?.children
              ? props.children(getLocalUserAuthStatus(userAuthenticationStatus), scrollY)
              : null}
          </View>

        }

        {!props?.navigationBean?.showBnb && toastTypeData !== undefined && (
          <CWToast
            style={[{ marginBottom: 90 }, toastTypeData?.viewStyle]}
            message={toastTypeData?.message || "Something went wrong!"}
            isVisible={toastTypeData.isVisible}
            semanticState={toastTypeData?.semanticState}
            duration={toastTypeData?.duration}
            showClose={toastTypeData?.showClose}
            type={toastTypeData?.type}
            offset={insets.top}
            onDismiss={() => {
              setToastTypeData(undefined);
            }}
          />
        )}
      </View>



      {/* <JioBottomSheet isVisible={exitInvest}
        style={{ margin: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
        showClose={false}
        children={
          <View style={{ padding: 24, flex: 1 }}>
            <JioText style={{ paddingVertical: 16 }} textAlign={'center'} text={jsonAppText?.leavingPopupMessage || "You are leaving\nJio BlackRock"} appearance={JioTypography.HEADING_XS} color={"primary_grey_100"} />
            <ProgressBar isReversed={false} progress={100} isForLeavingPopup={true} isColorChange={true} />
          </View>
        } /> */}
      {/* {drawer ?
        <Animated.View style={[styles.drawer, { transform: [{ translateX }], backgroundColor: 'white' }]}><JBProfileMenu drawerStatus={(isOpen) => {
          isOpen ? null : setdrawerClosing(true)
          setDrawer(isOpen)
          drawerRef.current = isOpen
        }} /></Animated.View>
        : drawerClosing ? <Animated.View style={[styles.drawer, { transform: [{ translateX }], backgroundColor: 'white' }]}><JBProfileMenu drawerStatus={(isOpen) => {
          setDrawer(isOpen)
          drawerRef.current = isOpen
        }} /></Animated.View> : null} */}
      {/* {props?.navigationBean?.showBnb ? (
        <CustomTabNavigator
          openDrawer={openDrawer}
          navigation={navigation}
          removeBack={() => BackHandler.removeEventListener('hardwareBackPress', onBackPress)}
          navBean={props?.navigationBean ?? ''}
          onPressOfBack={() => {
            onBackPress()
          }}
        />
      ) : null} */}
    </View>
  );
}


export class BackHandleUtility {
  public callBackPress: () => void = () => { }

  public setHandleBack(handleBack: () => void) {
    this.callBackPress = handleBack
  }

  private static _instance: BackHandleUtility;

  private constructor() { }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1, // Ensures it's on top of other components
  },
});
export default ScreenSlot;
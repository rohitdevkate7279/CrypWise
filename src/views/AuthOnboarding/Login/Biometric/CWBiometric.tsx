import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppScreens } from "../../../../navigation/CWNavigationConstants";
import { ActionType, navigationBeanObj, NavigationStackData } from "../../../../navigation/CWNavGraph";
import ScreenSlot, { DeeplinkHandler } from "../../../../CWUtilities/CWScreenSlot";
import { HeaderType } from "../../../../CWUtilities/CWScreenSlot.Types";
import { Animated, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "../../../../theme/CWCustomTokenProvider";
import { useEffect, useState } from "react";
import { authenticateBiometric } from "./CWBiometric.service";
import CWButton from "../../../../CWComponents/CWButtons/CWButton";
import useBiometricViewModel from "./useBiometricViewModel";
import { CWButtonKind, CWButtonSize, CWButtonState } from "../../../../CWComponents/CWButtons/CWButton.types";
import CWText from "../../../../CWComponents/CWText/CWText";
import { CWTypography } from "../../../../CWComponents/CWText/CWTextType";

type Props = NativeStackScreenProps<
    NavigationStackData,
    AppScreens.BIOMETRIC_SCREEN
>;

const CWBiometric = ({ navigation }: Props) => {
    const { theme, handleBiometricAuth } = useBiometricViewModel()

    const schemeMainUi = (scrollY: Animated.Value) => {
        return (
            <View
                style={[
                    style.container
                ]}
            >

                <View style={style.centerContainer}>
                    <LottieView
                        source={require("../../../../CWAssets/biometric.json")}
                        autoPlay
                        loop
                        resizeMode="contain"
                        style={style.lottie}
                    />
                </View>

                <View style={{ flex: 1, justifyContent: "space-between" }}>

                    <View style={style.textContainer}>

                        <CWText
                            text="Create your CrypWise with biometrics"
                            appearance={CWTypography.BODY_M}
                            textAlign="center"
                            style={style.subtitle}
                            color={"primary_60"}
                        />

                        <CWText
                            text={"No Logins.\nIdentity\nUnlocks All"}
                            appearance={CWTypography.HEADING_M}
                            textAlign="center"
                            color={"primary_inverse"}
                            style={style.title}
                        />

                        <CWText
                            text="Biometric-secured and private. Only you can access it."
                            appearance={CWTypography.BODY_S}
                            textAlign="center"
                            color={"primary_90"}
                        />

                    </View>
                    <View style={style.bottomContainer}>

                        <View style={style.centerWrapper}>
                            <CWButton
                                title="→"
                                kind={CWButtonKind.CIRCLE}
                                size={CWButtonSize.LARGE}
                                onPress={()=>{
                                    handleBiometricAuth()
                                }}
                            />
                        </View>

                        <CWButton
                            title="Skip"
                            kind={CWButtonKind.TERTIARY}
                            onPress={handleBiometricAuth}
                            style={style.skipButton}
                        />

                    </View>
                </View>
            </View>

        )
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
                    navTitle: "Account Security",
                })}
                navigation={navigation}>
                {bean => (
                    <ScreenSlot
                        navigationBean={bean}
                        navigation={navigation}
                        showBack={false}
                        disableBack
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
        </>)
}

export default CWBiometric;

const style = StyleSheet.create({
    container: {
        flex: 1,
    },

    centerContainer: {
        // flex: 1,
        // justifyContent: "center",
        marginTop: 24,
        alignItems: "center",
    },
    bottomContainer: {
        marginBottom: 16,
        position: "relative",
        height: 60,
    },

    centerWrapper: {
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
    },

    skipButton: {
        position: "absolute",
        right: 0,
    },

    lottie: {
        width: 250,
        height: 250,
    },
    textContainer: {
        alignItems: "center",
        marginTop: 56,
    },

    subtitle: {
        marginBottom: 16,
    },

    title: {
        marginBottom: 16,
    },
})
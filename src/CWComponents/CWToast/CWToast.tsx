import React, { useState, useEffect } from "react";
import { Dimensions, Animated, View, Pressable, StyleSheet } from "react-native";
import { IconColor, IconSize } from "../CWIcons/CWIcon.types";
import { SchematicState, Duration, ToastType, CWToastProps } from "./CWToast.Types";
import { useTheme } from "../../theme/CWCustomTokenProvider";
import { CWIcon } from "../CWIcons/CWIcon";
import CWLoader from "../CWLoader/CWLoader";
import { CWLoaderAppearance, CWLoaderSize } from "../CWLoader/CWLoaderTypes";
import CWText from "../CWText/CWText";
import { CWTypography } from "../CWText/CWTextType";
import LinearGradient from "react-native-linear-gradient";

const screenHeight = Dimensions.get("screen").height;

function getToastIcon(semanticState: SchematicState) {
    if (semanticState === SchematicState.ERROR) {
        return "IcErrorColored";
    } else if (semanticState === SchematicState.WARNING) {
        return "IcWarningColored";
    } else if (semanticState === SchematicState.SUCCESS) {
        return "IcSuccessColored";
    } else {
        return "IcInfo";
    }
}
function getIconColor(semanticState: SchematicState) {
    switch (semanticState) {
        case SchematicState.ERROR:
            return IconColor.ERROR;
        case SchematicState.WARNING:
            return IconColor.WARNING;
        case SchematicState.SUCCESS:
            return IconColor.SUCCESS;
        default:
            return IconColor.PRIMARY;
    }
}
function getDurationValue(duration: Duration) {
    switch (duration) {
        case Duration.SHORT:
            return 3000;
        case Duration.LONG:
            return 7000;
        case Duration.PERSIST:
            return Number.MAX_SAFE_INTEGER;
        default:
            return 5000;
    }
}
function CWToast({
    isVisible,
    message,
    subTitle,
    semanticState = SchematicState.ERROR,
    duration = Duration.MEDIUM,
    showClose = false,
    type = ToastType.SCHEMATIC,
    maxLines = 3,
    style,
    onDismiss,
}: CWToastProps) {
    const theme = useTheme();
    const [slideAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(slideAnimation, {
            toValue: isVisible ? 1 : 0,
            duration: 700,
            useNativeDriver: true,
        }).start();
    }, [slideAnimation, isVisible]);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (isVisible) {
            timeoutId = setTimeout(() => {
                if (onDismiss) {
                    onDismiss();
                }
            }, getDurationValue(duration));
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isVisible, duration]);

    const getToastPrefix = (
        toastType: ToastType,
        semanticState: SchematicState
    ) => {
        switch (toastType) {
            case ToastType.SCHEMATIC:
                return (
                    semanticState && (
                        <CWIcon
                            ic={getToastIcon(semanticState)}
                            size={IconSize.LARGE}
                            color={getIconColor(semanticState)}
                        ></CWIcon>
                    )
                );
            case ToastType.SPINNER:
                return (
                    <CWLoader
                        size={CWLoaderSize.SMALL}
                    ></CWLoader>
                );
            default:
                null;
        }
    };
    return (
        <Animated.View
            pointerEvents="box-none"
            style={[
                styles.wrapper,
                {
                    transform: [
                        {
                            translateY: slideAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [screenHeight, 0],
                            }),
                        },
                    ],
                },
            ]}
        >
            <View style={[styles.glassContainer, style]}>
                {/* GLASS HIGHLIGHT */}
                <View style={styles.darkLayer} />

                <LinearGradient
                    colors={[
                        "rgba(255,255,255,0.45)",
                        "rgba(255,255,255,0.18)",
                        "rgba(255,255,255,0.06)",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />

                {/* CONTENT */}
                <View style={styles.content}>
                    {getToastPrefix(type, semanticState)}

                    <View style={styles.textBlock}>
                        <CWText
                            text={message}
                            appearance={CWTypography.BODY_M_BOLD}
                            color="primary_inverse"
                            maxLines={maxLines}
                        />

                        {!!subTitle && (
                            <CWText
                                text={subTitle}
                                appearance={CWTypography.BODY_XS}
                                color="primary_inverse"
                                maxLines={2}
                            />
                        )}
                    </View>

                    {showClose && (
                        <Pressable onPress={onDismiss}>
                            <CWIcon
                                ic="IcClose"
                                size={IconSize.SMALL}
                                color="primary_inverse"
                            />
                        </Pressable>
                    )}
                </View>
            </View>

        </Animated.View>
    );

}
const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
    },

    glassContainer: {
        margin: 24,
        borderRadius: 24,
        overflow: "hidden",

        backgroundColor: "rgba(30,30,30,0.45)",

        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.50)",

        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 12 },

        elevation: 10,
    },
    darkLayer: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "rgba(0,0,0,0.80)",
    },


    content: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 12,
    },

    textBlock: {
        flex: 1,
        gap: 4,
    },
});
export default CWToast;


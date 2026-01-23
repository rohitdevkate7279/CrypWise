import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

import CWText from "../../CWComponents/CWText/CWText";
import CWButton from "../../CWComponents/CWButtons/CWButton";
import { useColors } from "../../theme/CWCustomTokenProvider";
import { CWTypography } from "../../CWComponents/CWText/CWTextType";
import { CWButtonKind } from "../../CWComponents/CWButtons/CWButton.types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const IMAGE_HEIGHT = Math.min(520, SCREEN_HEIGHT * 0.62);
const FADE_HEIGHT = 200;

const CWIntroScreen = () => {
    const theme = useColors();

    return (
        <View style={[styles.root, { backgroundColor: theme.primary_background }]}>

            <Image
                source={require("../../CWComponents/IntroScreenImage.png")}
                resizeMode="cover"
                style={styles.heroImage}
            />

            <LinearGradient
                colors={[
                    "rgba(0,0,0,0)",
                    theme.primary_background,
                ]}
                locations={[0, 1]}
                style={styles.fade}
            />

            <SafeAreaView edges={["bottom"]} style={styles.bottomArea}>
                <View style={styles.textBlock}>
                    <CWText
                        text="Invest Smarter, Trade Faster, Earn More"
                        appearance={CWTypography.BODY_L_BOLD}
                        color="primary_inverse"
                    />

                    <CWText
                        text="Access top coins, track performance, and make informed decisions with lightning-fast crypto tools."
                    />
                </View>

                <View style={{ gap: 8 }}>
                    <CWButton
                        title="Get Started"
                        stretch
                        onPress={() => {
                            // navigation.navigate(...)
                        }}
                    />
                    <CWButton
                        title="Skip"
                        stretch
                        kind={CWButtonKind.TERTIARY}
                        onPress={() => {
                            // navigation.navigate(...)
                        }}
                    />
                </View>

            </SafeAreaView>
        </View>
    );
};

export default CWIntroScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },

    heroImage: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: IMAGE_HEIGHT,
    },

    fade: {
        position: "absolute",
        top: IMAGE_HEIGHT - FADE_HEIGHT,
        width: "100%",
        height: FADE_HEIGHT,
    },

    bottomArea: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 24,
        gap:24
    },

    textBlock: {
        marginBottom: 24,
        gap: 12,
    },
});

import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CWButton from "../../../CWComponents/CWButtons/CWButton";
import { CWButtonSize, CWButtonKind } from "../../../CWComponents/CWButtons/CWButton.types";
import CWText from "../../../CWComponents/CWText/CWText";
import { CWTypography } from "../../../CWComponents/CWText/CWTextType";
import { AppScreens } from "../../../CWUtilities/CWConstants";
import { NavigationStackData, navigateTo, ActionType } from "../../../navigation/CWNavGraph";
import { useColors } from "../../../theme/CWCustomTokenProvider";


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const IMAGE_HEIGHT = Math.min(520, SCREEN_HEIGHT * 0.62);
const FADE_HEIGHT = 200;

interface IntroItem {
    heading: string;
    subHeading: string;
}

const DATA: IntroItem[] = [
    {
        heading: "Invest Smarter, Trade Faster, Earn More",
        subHeading:
            "Access top coins, track performance, and make informed decisions with lightning-fast crypto tools.",
    },
    {
        heading: "All Your Crypto. One Powerful App",
        subHeading:
            "Monitor prices, manage portfolios, and stay ahead of the market effortlessly.",
    },
    {
        heading: "Lightning-Fast Trades, Zero Hassle",
        subHeading:
            "Execute trades instantly with secure and reliable infrastructure.",
    }
];

type Props = NativeStackScreenProps<NavigationStackData, AppScreens.INTROSCREEN>;
const CWIntroScreen = ({ navigation, route }: Props) => {

    const theme = useColors();
    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<FlatList>(null);
    const autoScrollRef = useRef<number | null>(null);

    useEffect(() => {
        startAutoScroll();

        return () => {
            stopAutoScroll();
        };
    }, []);


    const startAutoScroll = () => {
        stopAutoScroll();

        autoScrollRef.current = setInterval(() => {
            setActiveIndex((prev) => {
                const nextIndex = (prev + 1) % DATA.length;

                listRef.current?.scrollToOffset({
                    offset: nextIndex * SCREEN_WIDTH,
                    animated: true,
                });

                return nextIndex;
            });
        }, 4000);
    };

    const stopAutoScroll = () => {
        if (autoScrollRef.current !== null) {
            clearInterval(autoScrollRef.current);
            autoScrollRef.current = null;
        }
    };

    const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(
            e.nativeEvent.contentOffset.x / SCREEN_WIDTH
        );
        setActiveIndex(index);
        startAutoScroll();

    };


    return (
        <View style={[styles.root, { backgroundColor: theme.primary_background }]}>
            <Image
                source={require("../../../CWComponents/IntroScreenImage.png")}
                resizeMode="cover"
                style={styles.heroImage}
            />

            {/* IMAGE FADE for image mixing with bg */}
            <LinearGradient
                colors={["rgba(0,0,0,0)", theme.primary_background]}
                style={styles.fade}
            />

            <SafeAreaView edges={["bottom"]} style={styles.bottomArea}>
                {/* CAROUSEL */}
                <View style={styles.carouselContainer}>
                    <FlatList
                        ref={listRef}
                        data={DATA}
                        horizontal
                        pagingEnabled

                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={onScrollEnd}
                        keyExtractor={(_, i) => i.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.carouselItem}>
                                <View style={styles.textContainer}>
                                    <CWText
                                        text={item.heading}
                                        appearance={CWTypography.HEADING_S}
                                        color="primary_inverse"
                                        style={styles.heading}
                                    />

                                    <CWText
                                        text={item.subHeading}
                                        color="primary_90"
                                        appearance={CWTypography.BODY_S}
                                        style={styles.subHeading}
                                    />
                                </View>
                            </View>

                        )}
                    />

                    {/* PAGINATION */}
                    <View style={styles.dots}>
                        {DATA.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    {
                                        opacity: activeIndex === i ? 1 : 0.3,
                                        width: activeIndex === i ? 16 : 6,
                                    },
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* BUTTONS */}
                <View style={styles.buttons}>
                    <CWButton title="Get Started" stretch size={CWButtonSize.MEDIUM} 
                    onPress={()=>{
                        navigateTo({
                            actionType: ActionType.OPEN_NATIVE,
                            destination: AppScreens.LOGIN_SCREEN,
                            params: {
                            }
                        }, navigation)
                    }}/>
                    <CWButton
                        title="Explore"
                        stretch
                        kind={CWButtonKind.TERTIARY}
                        
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
        paddingHorizontal: 0,
        gap: 24,
    },
    carouselContainer: {
        minHeight: 160,
    },
    carouselItem: {
        width: SCREEN_WIDTH,
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        width: SCREEN_WIDTH - 48,
        alignItems: "center",
        gap: 12,
    },
    heading: {
        textAlign: "center",
        lineHeight: 36,
    },
    subHeading: {
        textAlign: "center",
        lineHeight: 22,
    },
    dots: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
        gap: 6,
    },
    dot: {
        height: 6,
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
    },
    buttons: {
        gap: 12,
        paddingHorizontal: 24,
        marginTop: 8
    },
});

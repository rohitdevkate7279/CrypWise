import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    Pressable,
    StatusBar,
    Animated,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '../../theme/CWCustomTokenProvider'
import { CWHeaderProps } from './CWHeaderProps'
import { CWIcon } from '../CWIcons/CWIcon'
import { IconSize } from '../CWIcons/CWIcon.types'
import CWText from '../CWText/CWText'
import { CWTypography } from '../CWText/CWTextType'

const HEADER_HEIGHT = 40
const SCROLL_THRESHOLD = 45

const CWHeader = ({
    scrollY,
    showBack,
    onBackPress,
    title,
    renderTitle,
    showNotification,
    onNotificationPress,
    showAvatar,
    avatarSource,
    onAvatarPress,
}: CWHeaderProps) => {
    const insets = useSafeAreaInsets()
    const colors = useColors()
    const backAnim = React.useRef(new Animated.Value(1)).current

    const handleBackPress = () => {
        Animated.sequence([
            Animated.spring(backAnim, {
                toValue: 1.40,
                speed: 40,
                bounciness: 6,
                useNativeDriver: true,
            }),
            Animated.spring(backAnim, {
                toValue: 1,
                speed: 40,
                bounciness: 6,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onBackPress?.()
        })
    }

    const bgOpacity = scrollY?.interpolate({
        inputRange: [0, SCROLL_THRESHOLD],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    })

    return (
        <>
            <Animated.View
                style={[
                    styles.wrapper,
                    {
                        height: HEADER_HEIGHT + insets.top,
                    },
                ]}
            >
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFillObject,
                        {
                            backgroundColor: colors.primary_40,
                            opacity: bgOpacity,
                        },
                    ]}
                />


                <View
                    style={[
                        styles.container,
                        {
                            paddingTop: insets.top,
                        },
                    ]}
                >
                    <View style={styles.left}>
                        {showBack && (
                            <Pressable onPress={handleBackPress} hitSlop={10}>
                                <Animated.View
                                    style={{
                                        transform: [{ scale: backAnim }],
                                    }}
                                >
                                    <CWIcon
                                        ic="IcBack"
                                        size={IconSize.LARGE}
                                        backgroundColor={'primary_inverse'}
                                    />
                                </Animated.View>
                            </Pressable>
                        )}
                    </View>

                    {/* CENTER */}
                    <View style={styles.center}>
                        {renderTitle ? (
                            renderTitle()
                        ) : (
                            title && (
                                <CWText
                                    text={title}
                                    appearance={CWTypography.BODY_L_BOLD}
                                    style={[styles.title, { flexShrink: 1 }]}
                                />
                            )
                        )}
                    </View>

                    {/* RIGHT */}
                    <View style={styles.right}>
                        {showNotification && (
                            <Pressable onPress={onNotificationPress} hitSlop={10}>
                                <CWIcon ic="IcNotification" size={IconSize.MEDIUM} />
                            </Pressable>
                        )}

                        {showAvatar && avatarSource && (
                            <Pressable onPress={onAvatarPress}>
                                <Image source={avatarSource} style={styles.avatar} />
                            </Pressable>
                        )}
                    </View>
                </View>
            </Animated.View>
        </>
    )
}

export default CWHeader
const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'transparent',
    },
    container: {
        height: HEADER_HEIGHT,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24
    },
    left: {
        width: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    right: {
        width: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    title: {
        color: 'rgba(255,255,255,0.95)',
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
    },
})

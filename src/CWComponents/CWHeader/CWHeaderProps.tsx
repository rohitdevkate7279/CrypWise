import { ImageSourcePropType, Animated } from 'react-native'

export interface CWHeaderProps {
  /* SCROLL */
  scrollY?: Animated.Value

  /* LEFT */
  showBack?: boolean
  onBackPress?: () => void

  /* CENTER */
  title?: string
  renderTitle?: () => React.ReactNode

  /* RIGHT */
  showNotification?: boolean
  onNotificationPress?: () => void

  showAvatar?: boolean
  avatarSource?: ImageSourcePropType
  onAvatarPress?: () => void
}

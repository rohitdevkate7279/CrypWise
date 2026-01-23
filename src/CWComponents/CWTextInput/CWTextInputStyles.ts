import { Platform, StyleSheet } from 'react-native';
import { Dimensions, PixelRatio } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputsContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 48,
  },
  codeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  codeText: {
    borderColor: 'transparent',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.01,
    
  },
  stick: {
    width: 2,
    height: 30,
  },
    statusBarBackground: {
      height: Platform.OS === 'ios' ? 60 : 0,
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
 
});

import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isDesktop = window.navigator.userAgent.includes('Tauri');
export const devicePlatform = isIOS ? 'ios' : isAndroid ? 'android' : isDesktop ? 'desktop' : 'web';
export const isNative = isIOS || isAndroid;
export const isWeb = !isNative;

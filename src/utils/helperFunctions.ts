import NetInfo from '@react-native-community/netinfo';
import { Alert, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';

import { i18n } from '../constants/lang';

import { getItem, setItem } from './utils';

const t = i18n.t;

interface AlertOptions {
  title?: string;
  message?: string;
  yesText?: string;
  noText?: string;
  onYes?: () => void;
  onNo?: () => void;
  buttons?: ButtonConfig[];
  isNoButton?: boolean;
}
export interface LocationObject {
  latitude: number;
  longitude: number;
}

interface ButtonConfig {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

const isIos = Platform.OS === 'ios' ? true : false;
const isTablet = DeviceInfo.isTablet();

const showAlert = ({
  title = '',
  message = '',
  yesText = t('YES'),
  noText = t('NO'),
  onYes = () => {},
  onNo = () => {},
  buttons = [],
  isNoButton = true,
}: AlertOptions): void => {
  const defaultButtons: ButtonConfig[] = [{ text: yesText, onPress: onYes }];

  if (isNoButton) {
    defaultButtons.unshift({ text: noText, onPress: onNo, style: 'cancel' });
  }

  const alertButtons = [...defaultButtons, ...buttons].map(button => ({
    text: button.text,
    onPress: button.onPress,
    style: button.style || 'default',
  }));

  Alert.alert(title, message, alertButtons, { cancelable: false });
};

const showError = (message: string) => {
  Toast.show({
    type: 'error',
    text1: message,
    autoHide: true,
    swipeable: false,
    visibilityTime: 3000,
  });
};

const showSuccess = (message: string) => {
  Toast.show({
    type: 'success',
    text1: message,
    autoHide: true,
    swipeable: false,
    visibilityTime: 3000,
  });
};
const showInfo = (message: string) => {
  Toast.show({
    type: 'info',
    text1: message,
    autoHide: true,
    swipeable: false,
    visibilityTime: 3000,
  });
};

const checkIsNetConnected = async () => {
  try {
    const info = await NetInfo.fetch();
    return info.isConnected;
  } catch (error) {
    APP_LOG('Error checking network status:', error);
    return false;
  }
};
const errorMethod = async (error: any) => {
  if (!!error) {
    try {
      showError(error?.message || error?.error || error);
    } catch (errr) {
      showError(error?.message || error?.error || error);
    }
  }
};

const APP_LOG = (message?: any, ...optionalParams: any[]) => {
  console.log(message, ...optionalParams);
};

export {
  APP_LOG,
  checkIsNetConnected,
  errorMethod,
  isIos,
  isTablet,
  showAlert,
  showError,
  showInfo,
  showSuccess,
};

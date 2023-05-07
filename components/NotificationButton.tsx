import React, { useState, useEffect, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { NotificationMessageDTO } from '../models/notification/NotificationMessageDTO';

import { ButtonContainer } from '../app/styles/ButtonContainer';
import { ButtonText } from '../app/styles/ButtonText';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(
  message: NotificationMessageDTO,
  expoPushToken: string
): Promise<void> {
  const notificationMessage = {
    ...message,
    to: expoPushToken,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notificationMessage),
  });
}

async function registerForPushNotificationsAsync(): Promise<string> {
  let token: string;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return '';
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    Alert.alert('Must use physical device for Push Notifications');
    return '';
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

interface Props {
  title: string;
  message: NotificationMessageDTO;
  handlePress: () => boolean;
  isDisabled?: boolean;
}

const NotificationButton: React.FunctionComponent<Props> = ({
  title,
  message,
  handlePress,
  isDisabled,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ButtonContainer
      disabled={isDisabled}
      isReady={!isDisabled}
      onPress={async () => {
        const isPhoneNumberValid = handlePress();
        if (!isPhoneNumberValid) return;

        const deviceType = await Device.getDeviceTypeAsync();

        if (![1, 2].includes(deviceType)) return;

        await sendPushNotification(message, expoPushToken);
      }}
      accessibilityRole="button"
    >
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default NotificationButton;

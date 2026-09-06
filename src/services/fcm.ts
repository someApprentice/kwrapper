import { PermissionState } from '@capacitor/core';

import {
  PushNotifications,
  Token,
  RegistrationError,
  PushNotificationSchema
} from '@capacitor/push-notifications';

import { LocalNotifications } from '@capacitor/local-notifications';

export class FcmPermissionException extends Error {
  constructor(
    msg: string = "KWRAPPER FCM encountered a permission exception.",
    public readonly status?: PermissionState,
  ) {
    super(msg);

    Object.setPrototypeOf(this, FcmPermissionException.prototype);
  }
}

export class FcmUserDeniedPermissionException extends FcmPermissionException {
  constructor(
    public readonly status?: PermissionState,
    msg: string = "The user has denied permission for notifications.",
  ) {
    super(msg, status);

    Object.setPrototypeOf(this, FcmUserDeniedPermissionException.prototype);
  }
}

export class FcmUserAlreadyGrantedPermissionException extends FcmPermissionException {
  constructor(
    public readonly status?: PermissionState,
    msg: string = "The user has already granted permission for notifications.",
  ) {
    super(msg, status);

    Object.setPrototypeOf(this, FcmUserAlreadyGrantedPermissionException.prototype);
  }
}

export class FcmUserNotGrantedPermissionException extends FcmPermissionException {
  constructor(
    status?: PermissionState,
    msg: string = "The user has not granted permission for notifications.",
  ) {
    super(msg, status);

    Object.setPrototypeOf(this, FcmUserNotGrantedPermissionException.prototype);
  }
}

export async function check(): Promise<PermissionState> {
  const status = await LocalNotifications.checkPermissions();

  return status.display;
}

// How to prevent a multiple calls of this function to prevent a memory leak?
export async function listen(
  onRegistration: (token: Token['value']) => void,
  onError: (error: RegistrationError['error']) => void,
  onNotification: (notification: PushNotificationSchema) => void
): Promise<void> {
  // Emits on first launch of application no matter of the notification permissions.
  await PushNotifications.addListener('registration', (token: Token) => {
    onRegistration(token.value);
  });

  await PushNotifications.addListener('registrationError', (error: RegistrationError) => {
    onError(error.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
    onNotification(notification);
  });

  // @TODO
  // await PushNotifications.addListener('pushNotificationReceived', onReceived);
  // await PushNotifications.addListener('pushNotificationActionPerformed', onActivated);
}


export async function request(): Promise<PermissionState> {
  let status = await check();

  if (status === 'denied') throw new FcmUserDeniedPermissionException(status);
  if (status === 'granted') throw new FcmUserAlreadyGrantedPermissionException(status);

  status = (await PushNotifications.requestPermissions()).receive;

  return status;
}

export async function register(): Promise<void> {
  const status = await check();

  if (status !== 'granted') throw new FcmUserNotGrantedPermissionException(status);

  await PushNotifications.register();
}

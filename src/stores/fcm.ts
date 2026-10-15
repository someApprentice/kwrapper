import { defineStore, storeToRefs } from 'pinia';

import { ref } from 'vue';

import { PermissionState } from '@capacitor/core';
import { ActionPerformed, PushNotificationSchema } from '@capacitor/push-notifications';

import { SecureStorage } from '@aparajita/capacitor-secure-storage';

import {
  check as chk,
  listen,
  request as req,
  register as reg,
} from '@/services/fcm';

import { useAuthStore } from './auth';
import { useProjectsStore } from './projects';

// @TODO Move the constant into the env variables.
export const SECURE_STORAGE_FCM_TOKEN_KEY = 'fcm_token';

const SILENT_MESSAGE_TYPE = import.meta.env.VITE_FCM_SILENT_MESSAGE_TYPE;
const NOTIFICATION_MESSAGE_TYPE = import.meta.env.VITE_FCM_NOTIFICATION_MESSAGE_TYPE;

const FCM_PROJECT_NAMESPACE = import.meta.env.VITE_FCM_PROJECT_NAMESPACE;


export const useFcmStore = defineStore('fcm', () => {
  const token = ref<string|undefined>();

  const status = ref<PermissionState|undefined>();

  const isInitialized = ref<boolean>(false);

  const error = ref<string|undefined>();

  const authStore = useAuthStore();
  const projectsStore = useProjectsStore();

  const { isAuthenticated } = storeToRefs(authStore);

  async function init() {
    if (!!isInitialized.value) return;

    status.value = await chk();

    await listen(
      onRegistration,
      onRegistrationError,
      onNotification,
      onAction
    );

    if (status.value === 'granted') {
      await register();
    }

    isInitialized.value = true;
  }

  async function onRegistration(t: string) {
    const storageToken = await SecureStorage.get(SECURE_STORAGE_FCM_TOKEN_KEY) as string|null;

    if (storageToken !== t) {
      if (isAuthenticated.value) {
        await authStore.patchToken(t);
      }

      await SecureStorage.set(SECURE_STORAGE_FCM_TOKEN_KEY, t);
    }

    token.value = t;
  }

  function onRegistrationError(err: string) {
    error.value = err;
  }

  async function onNotification(notification: PushNotificationSchema) {
    if (!isInitialized.value) return;

    const type = notification.data.type;

    switch (type) {
      case SILENT_MESSAGE_TYPE:
        await onSilentNotification(notification);
        break;

      case NOTIFICATION_MESSAGE_TYPE:
        break
    }
  }

  async function onSilentNotification(notification: PushNotificationSchema) {
    if (notification.data.type !== SILENT_MESSAGE_TYPE)
      return;

    const namespace = notification.data.namespace;

    switch (namespace) {
      case FCM_PROJECT_NAMESPACE:
        await onSilentProjectNotification(notification);
        break;
    }
  }

  async function onSilentProjectNotification(notification: PushNotificationSchema) {
    if (notification.data.type !== SILENT_MESSAGE_TYPE) return;
    if (notification.data.namespace !== FCM_PROJECT_NAMESPACE) return;

    const project = JSON.parse(notification.data.payload);

    await projectsStore.merge([ project ]);
  }

  async function onAction(action: ActionPerformed) {
    // @TODO handle `action.actionId` cases.
    // 'tap' | 'dismiss' | custom id
    // actionId: string

    const namespace = action.notification.data.namespace;

    switch (namespace) {
    }
  }

  async function check() {
    const s = await chk();

    status.value = s;

    return s;
  }

  async function request() {
    const s = await req()

    status.value = s;

    return s;
  }

  async function register() {
    await reg();
  }

  return {
    token,
    status,
    init,
    check,
    request,
    register
  };
});

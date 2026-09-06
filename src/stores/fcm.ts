import { defineStore, storeToRefs } from 'pinia';

import { ref } from 'vue';

import { PermissionState } from '@capacitor/core';
import { PushNotificationSchema } from '@capacitor/push-notifications';

import { SecureStorage } from '@aparajita/capacitor-secure-storage';

import {
  check as chk,
  listen,
  request as req,
  register as reg,
} from '@/services/fcm';

import { useAuthStore } from './auth';

// @TODO Move the constant into the env variables.
export const SECURE_STORAGE_FCM_TOKEN_KEY = 'fcm_token';

export const useFcmStore = defineStore('fcm', () => {
  const token = ref<string|undefined>();

  const status = ref<PermissionState|undefined>();

  const isInitialized = ref<boolean>(false);

  const error = ref<string|undefined>();

  const authStore = useAuthStore();

  const { isAuthenticated } = storeToRefs(authStore);

  async function init() {
    if (!!isInitialized.value) return;

    status.value = await chk();

    await listen(
      onRegistration,
      onRegistrationError,
      onNotification
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

  function onNotification(notification: PushNotificationSchema) {
    // @TODO
    // ...
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

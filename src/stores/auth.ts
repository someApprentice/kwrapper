import { defineStore } from 'pinia';

import { ref, computed } from 'vue';

import { SecureStorage } from '@aparajita/capacitor-secure-storage';

import {
  login,
  patchToken as patch,
  logout,
  LoginCredentialsDTO,
  TokenDTO,
  AuthenticationException
} from '@/services/auth';

import { SECURE_STORAGE_FCM_TOKEN_KEY } from '@/stores/fcm';

// @TODO Move the constant into the env variables.
const SECURE_STORAGE_TOKEN_KEY = 'token';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<TokenDTO|undefined>();

  const hash = computed<string|undefined>(() => token.value?.hash);

  const isAuthenticated = computed<boolean>(() => !!hash.value);

  async function init() {
    const t = await SecureStorage.get(SECURE_STORAGE_TOKEN_KEY) as string|null;

    if (!t) return;

    token.value = JSON.parse(t);
  }

  // @TODO Log the errors.
  async function authenticate(credentials: LoginCredentialsDTO) {
    const t = await login(credentials);

    await SecureStorage.set(SECURE_STORAGE_TOKEN_KEY, JSON.stringify(t));

    token.value = t;
  }

  // @TODO Log the errors.
  async function patchToken(t: string) {
    if (!isAuthenticated) throw new AuthenticationException("Unauthenticated.");

    const h = hash.value!;

    const patchedToken = await patch(t, h);

    patchedToken.hash = h;

    await SecureStorage.set(SECURE_STORAGE_TOKEN_KEY, JSON.stringify(patchedToken));

    token.value = patchedToken;
  }

  // @TODO Log the errors.
  async function deauthenticate() {
    if (!isAuthenticated) throw new AuthenticationException("Unauthenticated.");

    const h = hash.value!;

    await logout(h);

    await SecureStorage.remove(SECURE_STORAGE_TOKEN_KEY);
    await SecureStorage.remove(SECURE_STORAGE_FCM_TOKEN_KEY);

    token.value = undefined;
  }

  return {
    token,
    hash,
    isAuthenticated,
    init,
    authenticate,
    patchToken,
    deauthenticate
  };
});

<template>
  <ion-button
    @click.prevent="logout"
    expand="block"
    color="danger"
  >
    <ion-text v-if="!isPending">Logout</ion-text>
    <ion-spinner v-else />
  </ion-button>

  <ion-text v-if="error" color="danger">{{ error }}</ion-text>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import {
    IonButton,
    IonText,
    IonSpinner,
    useIonRouter
  } from '@ionic/vue';

  import { useAuthStore } from '@/stores/auth';

  const router = useIonRouter();

  const { deauthenticate } = useAuthStore();

  const isPending = ref(false);

  const error = ref('');

  async function logout() {
    isPending.value = true;
    error.value = '';

    try {
      await deauthenticate();
    } catch (err) {
      // @TODO Log the error;
      console.error(err);
      error.value = err.message;
      return;
    } finally {
      isPending.value = false;
    }

    router.replace('/');
  }
</script>

<template>
  <main>
    <form @submit.prevent="submit">
      <ion-input
        aria-label="Login"
        label="Login"
        label-placement="floating"
        placeholder="Enter the login"
        v-model="form.login"
      />

      <ion-input
        type="password"
        aria-label="Password"
        label="Password"
        label-placement="floating"
        placeholder="Enter the password"
        v-model="form.password"
      />

      <ion-button type="submit" expand="block">
        <ion-text v-if="!isPending">Login</ion-text>
        <ion-spinner v-else />
      </ion-button>

      <ion-text v-if="error" color="danger">{{ error }}</ion-text>
    </form>
  </main>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { storeToRefs } from 'pinia';

  import {
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
    useIonRouter
  } from '@ionic/vue';

  import { useFcmStore } from '@/stores/fcm';
  import { useAuthStore } from '@/stores/auth';

  const router = useIonRouter();

  const authStore = useAuthStore();
  const fcmStore = useFcmStore();

  const { token } = storeToRefs(fcmStore);

  const form = ref({
    login: '',
    password: ''
  });

  const isPending = ref(false);

  const error = ref('');

  async function submit() {
    isPending.value = true;
    error.value = '';

    const credentials = form.value;

    if (!!token) {
      credentials.token = token;
    }

    try {
      await authStore.authenticate(credentials);
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

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  form {
    width: 50%;
  }

  form ion-button {
    margin: 1em 0;
  }

  form ion-spinner {
    width: .875rem;
    height: .875rem;
  }
</style>

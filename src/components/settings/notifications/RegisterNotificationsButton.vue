<template>
  <ion-button
    @click.prevent="request"
    expand="block"
  >
    <ion-text v-if="!isPending">Register the Notifications</ion-text>
    <ion-spinner v-else />
  </ion-button>

  <ion-text v-if="error" color="danger">{{ error }}</ion-text>
</template>

<script setup lang="ts">
  import {
    ref,
    computed,
    onMounted,
    onUnmounted
  } from 'vue';

  import { storeToRefs } from 'pinia';

  import { App, PluginListenerHandle } from '@capacitor/app';

  import {
    alertController,
    IonButton,
    IonText,
    IonSpinner,
  } from '@ionic/vue';

  import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings';

  import { useFcmStore } from '@/stores/fcm';

  const ALERT_HEADER = "Enable Notifications";
  const ALERT_MESSAGE = "Please enable notifications for this app in Settings before registering this device for notifications.";
  const ALERT_BUTTONS = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Settings',
      role: 'confirm',
      async handler() {
        await NativeSettings.open({
          optionAndroid: AndroidSettings.AppNotification, 
          optionIOS: IOSSettings.AppNotification
        });
      }
    }
  ];

  const fcmStore = useFcmStore();

  const { status, error: fcmError } = storeToRefs(fcmStore);

  const isPending = ref(false);

  const _error = ref('');
  const error = computed(() => fcmError || _error);

  async function init() {
    await App.addListener('resume', async () => {
      const s = await fcmStore.check();

      if (s !== 'granted' && s !== 'prompt') return;

      await register();
    });
  }

  async function destroy() {
    await App.removeAllListeners();
  }

  async function alert() {
    const alert = await alertController.create({
      header: ALERT_HEADER,
      message: ALERT_MESSAGE,
      buttons: ALERT_BUTTONS,
    });

    await alert.present();
  }

  async function request() {
    isPending.value = true;

    const s = await fcmStore.check();

    if (status.value === 'denied' || status.value === 'prompt-with-rationale') {
      await alert();

      isPending.value = false;

      return;
    }

    await register();

    isPending.value = false;
  }

  async function register() {
    try {
      if (status.value === 'prompt') {
        await fcmStore.request();
      }

      await fcmStore.register();
    } catch (err) {
      _error.value = err;
      console.error(err); // @TODO Log the error;
    }
  }

  onMounted(async () => {
    await init();
  });

  onUnmounted(async () => {
    await destroy();
  });
</script>

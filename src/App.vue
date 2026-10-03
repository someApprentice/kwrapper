<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script setup lang='ts'>
  import { ref, onMounted, computed } from 'vue';
  import { storeToRefs } from 'pinia'

  import { SplashScreen } from '@capacitor/splash-screen';

  import { IonApp, IonRouterOutlet, useIonRouter } from '@ionic/vue';

  import * as StatusBar from '@/services/status-bar';

  import { useFcmStore } from '@/stores/fcm';
  import { useAuthStore } from '@/stores/auth';

  const router = useIonRouter();

  const fcmStore = useFcmStore();
  const authStore = useAuthStore();

  const { token, hash, isAuthenticated } = storeToRefs(authStore);

  async function init() {
    await authStore.init();
    await fcmStore.init();

    if (!isAuthenticated.value) return;

    router.replace('/');

    await SplashScreen.hide();

    await StatusBar.init();
  }

  async function ionViewDidEnter() {
  }

  onMounted(async () => {
    await init();
  })
</script>

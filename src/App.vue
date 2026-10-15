<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script setup lang='ts'>
  import { ref, onMounted, computed } from 'vue';
  import { storeToRefs } from 'pinia'

  import { Preferences } from '@capacitor/preferences';
  import { SplashScreen } from '@capacitor/splash-screen';

  import { IonApp, IonRouterOutlet, useIonRouter } from '@ionic/vue';

  import { connect } from '@/services/db';

  import { synchronize, SynchronizatinDTO } from "@/services/sync";
  import * as StatusBar from '@/services/status-bar';

  import { useFcmStore } from '@/stores/fcm';
  import { useAuthStore } from '@/stores/auth';
  import { useProjectsStore } from '@/stores/projects';

  const router = useIonRouter();

  const fcmStore = useFcmStore();
  const authStore = useAuthStore();

  const projectsStore = useProjectsStore();

  const { token, hash, isAuthenticated } = storeToRefs(authStore);

  async function sync() {
    let dto: SynchronizationDTO;

    const since = parseInt((await Preferences.get({ key: 'synchronized_at' })).value);

    if (!!since) {
      dto = await synchronize(hash.value, since);
    } else {
      dto = await synchronize(hash.value);
    }

    await projectsStore.merge(dto.projects);

    await Preferences.set({ key: 'synchronized_at', value: (new Date()).getTime().toString() });
  }

  async function init() {
    await authStore.init();
    await fcmStore.init();

    if (isAuthenticated.value) {
      router.replace('/');

      await connect();

      await projectsStore.init();

      await sync();
    };

    await fcmStore.act();

    await SplashScreen.hide();

    await StatusBar.init();
  }

  async function ionViewDidEnter() {
  }

  onMounted(async () => {
    await init();
  })
</script>

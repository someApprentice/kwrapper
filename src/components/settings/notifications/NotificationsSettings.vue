<template>
  <h1>Notifications</h1>

  <ion-list>
    <ion-item>
      <Status :status="status" />
    </ion-item>

    <ion-item>
      <ion-input
        label="Token"
        :value="token"
        :readonly="true"
        :disabled="!token"
      />
    </ion-item>

    <ion-item v-if="status !== 'granted'">
      <ion-label>
        <RegisterNotificationsButton />
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import {
    IonItem,
    IonInput,
    IonList
  } from '@ionic/vue';

  import Status from '@/components/settings/notifications/Status.vue';
  import RegisterNotificationsButton from '@/components/settings/notifications/RegisterNotificationsButton.vue';

  import { useFcmStore } from '@/stores/fcm';

  const fcmStore = useFcmStore();

  const { status, token } = storeToRefs(fcmStore);
</script>

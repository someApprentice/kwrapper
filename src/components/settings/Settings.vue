<template>
  <main>
    <ion-list>
      <ion-item>
        <ion-label>
          <TokenSettings />
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <NotificationsSettings />
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <StorageSettings />
        </ion-label>
      </ion-item>
    </ion-list>
  </main>
</template>

<script setup lang="ts">
  import {
    IonItem,
    IonLabel,
    IonList
  } from '@ionic/vue';

  import TokenSettings from '@/components/settings/token/TokenSettings.vue';
  import NotificationsSettings from '@/components/settings/notifications/NotificationsSettings.vue';
  import StorageSettings from '@/components/settings/storage/StorageSettings.vue';
</script>

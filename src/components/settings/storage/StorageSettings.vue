<template>
  <h1>Storage</h1>

  <ion-list>
    <ion-item>
      <ion-label>
        <LocalStorageSettings />
      </ion-label>
    </ion-item>
  </ion-list>

  <ion-list>
    <ion-item>
      <ion-label>
        <SQLiteSettings />
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
  import {
    IonItem,
    IonLabel,
    IonList
  } from '@ionic/vue';

  import LocalStorageSettings from '@/components/settings/storage/LocalStorageSettings.vue';
  import SQLiteSettings from '@/components/settings/storage/SQLiteSettings.vue';
</script>

<style scoped>
</style>

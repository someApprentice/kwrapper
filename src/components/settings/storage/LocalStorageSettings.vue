<template>
  <h2>LocalStorage</h2>

  <ion-list>
    <ion-item>
      <ion-input
        label="synchronized_at"
        :value="synchronized_at"
        :readonly="true"
      />
    </ion-item>

    <ion-item>
      <ion-label>
        <ion-button
          @click.prevent="clear"
          expand="block"
          color="danger"
        >
          Clear
        </ion-button>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Preferences } from '@capacitor/preferences';

  import {
    IonButton,
    IonItem,
    IonInput,
    IonLabel,
    IonList
  } from '@ionic/vue';

  const synchronized_at = ref();

  async function init() {
    synchronized_at.value = (await Preferences.get({ key: 'synchronized_at' })).value;
  }

  async function clear() {
    await Preferences.clear();
  }

  onMounted(async () => {
    await init();
  });
</script>

<style scoped>
</style>

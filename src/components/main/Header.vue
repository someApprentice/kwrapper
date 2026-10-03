<template>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button></ion-back-button>
    </ion-buttons>

    <ion-title>{{ title }}</ion-title>

    <ion-buttons slot="end">
      <ion-toggle
        :enable-on-off-labels="true"
        :checked="notify"
      >
        Notifications
      </ion-toggle>
    </ion-buttons>
  </ion-toolbar>
</template>

<script setup lang="ts">
  import {
    IonButtons,
    IonBackButton,
    IonTitle,
    IonToggle
    IonToolbar,
  } from '@ionic/vue';

  interface HeaderProps {
    title: string;
  }

  // @TODO state manager
  const notify: boolean = true;

  const { title } = defineProps<HeaderProps>();
</script>

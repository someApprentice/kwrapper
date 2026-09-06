<template>
  <ion-page>
    <ion-header>
      <Header :title="title" />
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <slot>
        <main class="placeholder">
          <ion-text>{{ title }} placeholder.</ion-text>
        </main>
      </slot>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import {
    IonPage,
    IonHeader,
    IonText,
    IonTitle,
    IonToolbar,
    IonContent
  } from '@ionic/vue';

  import Header from '@/components/main/Header.vue';

  interface PageProps {
    title: string;
  }

  const { title } = defineProps<PageProps>();
</script>

<style scoped>
  .placeholder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>

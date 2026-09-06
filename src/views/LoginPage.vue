<template>
  <ion-page>
    <ion-content>
      <Login />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';

  import Login from '@/components/auth/Login.vue';
</script>

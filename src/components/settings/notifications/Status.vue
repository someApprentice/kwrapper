<template>
  <p>
    Permission: <ion-text :color="colorize(status)">{{ status }}</ion-text>
  </p>
</template>

<script setup lang="ts">
  import { computed, defineProps } from 'vue';

  import { PermissionState } from '@capacitor/core';

  import {
    IonText
  } from '@ionic/vue';

  interface StatusProps {
    status: PermissionState;
  }

  const { status } = defineProps<StatusProps>();

  function colorize(state: PermissionState) {
    switch (status) {
      case 'granted':
        return 'success';
      break;

      case 'prompt':
        return 'warning';
      break;

      case 'prompt-with-rationale':
        return 'warning';
      break;

      case 'denied':
        return 'danger';
      break;

      default:
        return undefined;
      break;
    }
  }
</script>

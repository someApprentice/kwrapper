<template>
  <div class="wrapper">
    <div class="output">
      <pre class="json ion-padding">{{ output }}</pre>
    </div>

    <div class="dashboard">
      <ion-button
        color="medium"
        fill="clear"
        @click="download()"
      >
         <ion-icon slot="icon-only" :ios="downloadOutline" :md="downloadOutline"></ion-icon>
      </ion-button>

      <ion-button 
        color="medium"
        fill="clear"
        @click="copy()"
      >
         <ion-icon slot="icon-only" :ios="copyOutline" :md="copyOutline"></ion-icon>
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    IonButton,
    IonIcon
  } from '@ionic/vue';

  import { copyOutline, downloadOutline } from 'ionicons/icons';

  interface LLMOutputProps {
    output: string;
  }

  const { output } = defineProps<LLMOutputProps>();

  // @TODO
  function copy() {}

  // @TODO
  function download() {}
</script>

<style scoped>
  .wrapper {
    width: 100%;
    min-height: 640px;
  }

  .json {
    -webkit-user-select: contain;
    -moz-user-select: contain;
    -ms-user-select: contain;
    user-select: contain;
    font-family: monospace;
    overflow: visible;
    white-space: pre-wrap;
    text-align: start;
    font-size: 12px;
  }

  .dashboard {
    display: flex;
    justify-content: flex-end;
  }
</style>

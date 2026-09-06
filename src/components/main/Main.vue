<template>
  <ion-tabs>
    <ion-router-outlet></ion-router-outlet>

    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="projects" href="/projects">
        <ion-icon aria-hidden="true" :icon="briefcase" />
        <ion-label>Projects</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="offers" href="/offers">
        <ion-icon aria-hidden="true" :icon="cart" />
        <ion-label>Offers</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="settings" href="/settings">
        <ion-icon aria-hidden="true" :icon="cog" />
        <ion-label>Settings</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script setup lang="ts">
  import {
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonRouterOutlet
  } from '@ionic/vue';

  import { briefcase, cart, cog } from 'ionicons/icons';
</script>

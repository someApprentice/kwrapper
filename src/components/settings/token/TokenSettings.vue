<template>
  <h1>Token</h1>

  <ion-list>
    <ion-item>
      <ion-input
        label="ID"
        :value="token?.id"
        :readonly="true"
      />
    </ion-item>

    <ion-item>
      <ion-input
        label="User ID"
        :value="token?.user_id"
        :readonly="true"
      />
    </ion-item>

    <ion-item>
      <ion-input
        label="Token"
        :value="token?.token"
        :readonly="true"
      />
    </ion-item>

    <ion-item>
      <ion-label>
        <ion-accordion-group>
          <ion-accordion value="token-json">
            <ion-item slot="header" color="light">
              <ion-label>JSON</ion-label>
            </ion-item>

            <pre class="json ion-padding" slot="content">{{ token }}</pre>
          </ion-accordion>
        </ion-accordion-group>
      </ion-label>
    </ion-item>

    <ion-item>
      <ion-label>
        <LogoutButton />
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import {
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonInput,
    IonLabel,
    IonList
  } from '@ionic/vue';

  import LogoutButton from '@/components/auth/LogoutButton.vue';

  import { useAuthStore } from '@/stores/auth';

  const authStore = useAuthStore();

  const { token } = storeToRefs(authStore);
</script>

<style scoped>
  .json {
    -webkit-user-select: contain;
    -moz-user-select: contain;
    -ms-user-select: contain;
    user-select: contain;
    font-family: monospace;
  }
</style>

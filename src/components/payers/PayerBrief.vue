<template>
  <div class="wrapper">
    <ion-avatar>
      <img
        :src="AVATAR_URL_PATH"
      />
    </ion-avatar>

    <div class="brief">
      <p><ion-text color="secondary">{{ payer.username }}</ion-text></p>
      <p v-if="!!payer.name"><ion-text color="secondary">{{ payer.name }}</ion-text></p>
      <p><ion-text>Projects: {{ payer.projects_count }} ({{ payer.hire_percent }}%)</ion-text></p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import { IonAvatar } from '@ionic/vue';
  import { IonText } from '@ionic/vue';

  import { PayerDTO } from '@/services/payers';

  interface PayerBriefProps {
    payer: PayerDTO;
  }

  const { payer } = defineProps<PayerBriefProps>();

  // @TODO Move these constants into the env variables.
  const KWORK_AVATAR_URL_PATH = 'https://cdn-edge.kwork.ru/files/avatar/big/'
  const AVATAR_PLACEHOLDER_ASSET_URL = '/assets/avatar.svg';

  const AVATAR_URL_PATH = computed(() => (
    !!payer.avatar_url
      ? `${KWORK_AVATAR_URL_PATH}${payer.avatar_url}`
      : AVATAR_PLACEHOLDER_ASSET_URL
  ));
</script>

<style scoped>
  ion-avatar {
    --border-radius: 4px;
  }

  .wrapper {
    display: flex;
    margin: 1em 0;
  }

  .brief {
      margin: 0 1em;
  }
</style>

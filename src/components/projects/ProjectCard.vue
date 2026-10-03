<template>
  <ion-card class="card">
    <ion-card-header>
      <ion-card-title>{{ project.title}}</ion-card-title>
      <ion-card-subtitle class="price">
        <ion-text color="success">{{ project.price }} ₽</ion-text>
        <span v-if="!!project.price_limit"> - <ion-text color="success">{{ project.price_limit }} ₽</ion-text></span>
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <div class="description" v-html="DOMPurify.sanitize(project.description)" />

      <PayerBrief :payer="project.payer" />

      <div class="info">
        <ion-text color="medium">Responses: {{ project.response_count }}</ion-text>
        <ion-text color="medium">Expire at: {{ expireAt }}</ion-text>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import DOMPurify from 'dompurify';

  import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonText } from '@ionic/vue';

  import { ProjectDTO } from '@/services/projects';

  import PayerBrief from '@/components/payers/PayerBrief.vue';

  interface ProjectCardProps {
    project: ProjectDTO;
  }

  const { project } = defineProps<ProjectCardProps>();

  const expireAt = computed(() => (new Date(project.expire_at)).toISOString());
</script>

<style scoped>
  .card {
    margin-left: 0;
    margin-right: 0;
  }

  .price {
    font-size: 1.5em;
  }

  .description {
    white-space: pre-line;
  }

  .info {
    display: flex;
    justify-content: space-between;
  }
</style>

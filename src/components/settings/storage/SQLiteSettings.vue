<template>
  <h2>SQLite</h2>

  <ion-list>
    <ion-item>
      <ion-label>
        <ion-accordion-group>
          <ion-accordion value="token-json">
            <ion-item slot="header" color="light">
              <ion-label>Projects</ion-label>
            </ion-item>

            <pre class="json ion-padding" slot="content">{{ projects }}</pre>
          </ion-accordion>
        </ion-accordion-group>
      </ion-label>
    </ion-item>

    <ion-item>
      <ion-label>
        <ion-button
          @click.prevent="del"
          expand="block"
          color="danger"
        >
          DELETE
        </ion-button>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  import { query, run } from '@/services/db';

  import {
    IonAccordion,
    IonAccordionGroup,
    IonButton,
    IonItem,
    IonLabel,
    IonList
  } from '@ionic/vue';

  const projects = ref();

  async function init() {
    const result = await query('SELECT * FROM projects', []);

    projects.value = result;
  }

  async function del() {
    await run('DELETE FROM projects');
  }

  onMounted(async () => {
    await init();
  });
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

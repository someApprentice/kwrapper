<template>
  <main>
    <ProjectCard :project="project" />

    <!-- @TODO move this layout to a separate component -->
    <div class="dashboard">
      <ion-button
        color="medium"
        fill="clear"
        @click="generate()"
      >
         <ion-icon slot="icon-only" :ios="beakerOutline" :md="beakerOutline"></ion-icon>
      </ion-button>

      <ion-button 
        color="secondary"
        fill="outline"
        @click="open()"
      >
        Open in a browser
      </ion-button>
    </div>

    <div class="llm-area">
      <LLMOutputs />
    </div>
  </main>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';

  import { InAppBrowser } from '@capacitor/inappbrowser';

  import {
    IonButton,
    IonIcon
  } from '@ionic/vue';

  import { beakerOutline } from 'ionicons/icons';

  import ProjectCard from '@/components/projects/ProjectCard.vue'
  import LLMOutputs from '@/components/llm/LLMOutputs.vue';

  import { useProjectsStore } from '@/stores/projects';

  interface ProjectProps {
    id: number;
  }

  const { id } = defineProps<ProjectProps>();

  const projectsStore = useProjectsStore();

  const { projects } = storeToRefs(projectsStore);

  const project = computed(() => projects.value.find(p => p.id == id));

  async function open(): void {
    // @TODO Move the constant into the env variables.
    const url = `https://kwork.ru/projects/${id}/view`;

    await InAppBrowser.openInExternalBrowser({
      url
    });
  }

  // @TODO
  function generate() {}
</script>

<style scoped>
  .dashboard {
    display: flex;
    justify-content: flex-end;
  }
</style>

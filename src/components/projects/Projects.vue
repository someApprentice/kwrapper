<template>
  <main>
    <ion-list>
      <ion-item class="item" v-for="project in projects" :key="project.id" @click="open(project)" >
        <ProjectCard :project="project" />
      </ion-item>
    </ion-list>
  </main>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { useRouter } from 'vue-router';

  import {
    IonItem,
    IonList,
    IonText
  } from '@ionic/vue';

  import ProjectCard from '@/components/projects/ProjectCard.vue'

  import { useProjectsStore } from '@/stores/projects';

  import { ProjectDTO } from '@/services/projects';

  const router = useRouter();

  const projectsStore = useProjectsStore();

  const { projects } = storeToRefs(projectsStore);

  function open(project: ProjectDTO) {
    router.push(`/project/${project.id}`);
  }
</script>

<style scoped>
</style>

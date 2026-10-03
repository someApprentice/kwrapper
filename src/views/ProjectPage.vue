
<template>
  <Page :title="TITLE">
    <Project :id="id" />
  </Page>
</template>

<script setup lang="ts">
  import Page from '@/components/main/Page.vue'
  import Project from '@/components/projects/Project.vue';

  interface ProjectPageProps {
    id: number;
  }

  const { id } = defineProps<ProjectPageProps>();

  const TITLE = "Project";
</script>

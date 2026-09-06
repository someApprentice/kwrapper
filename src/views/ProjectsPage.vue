<template>
  <Page :title="TITLE">
    <Projects />
  </Page>
</template>

<script setup lang="ts">
  import Page from '@/components/main/Page.vue'
  import Projects from '@/components/projects/Projects.vue';

  const TITLE = "Projects";
</script>

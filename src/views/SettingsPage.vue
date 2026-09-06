<template>
  <Page :title="TITLE">
    <Settings />
  </Page>
</template>

<script setup lang="ts">
  import Page from '@/components/main/Page.vue'
  import Settings from '@/components/settings/Settings.vue';

  const TITLE = "Settings";
</script>

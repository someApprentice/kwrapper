<template>
  <Page :title="TITLE">
    <Offers />
  </Page>
</template>

<script setup lang="ts">
  import Page from '@/components/main/Page.vue'
  import Offers from '@/components/offers/Offers.vue';

  const TITLE = "Offers";
</script>

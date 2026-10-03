<template>
  <div>
    <div class="swiper-pagination"></div>
  </div>

  <swiper
    :modules="modules"
    :keyboard="true"
    :pagination="pagination"
    :scrollbar="true"
  >
    <swiper-slide v-for="output in outputs"><LLMOutput :output="output" /></swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Keyboard, Pagination } from 'swiper/modules';
  import { IonicSlides } from '@ionic/vue';

  import 'swiper/css';
  import 'swiper/css/keyboard';
  import 'swiper/css/pagination';

  import LLMOutput from '@/components/llm/LLMOutput.vue';

  const modules = [ Keyboard, Pagination ];

  const pagination = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  };

  const OUTPUTS_MOCK = [
    "LLM output area first placeholder.",
    "LLM output area second placeholder.",
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie ut enim vitae pharetra. Duis quis velit sit amet tellus pharetra gravida. Duis leo arcu, volutpat eget pharetra at, sodales vel arcu. Nulla interdum tempus sapien ullamcorper condimentum. Donec et dignissim leo, nec placerat enim. Ut finibus tempus maximus. Cras vel sapien dolor. Vivamus dignissim mauris eget eros placerat, ut tempor sem aliquam. Phasellus consectetur erat et placerat bibendum. Aenean non sem tortor.

Sed vehicula at mauris volutpat imperdiet. Aliquam sed eros nibh. Nunc fermentum id leo in tincidunt. Donec a maximus enim, at venenatis sapien. Donec a odio quis ante suscipit ultricies et nec purus. Proin volutpat tempus ex. Donec congue commodo dolor, vel tempor leo eleifend ut. Donec porta tincidunt metus, ac mattis risus porttitor non. Curabitur eget gravida nulla, vitae vestibulum erat.

Morbi eget lacus a nibh lobortis faucibus at in libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla pretium ante id ex dapibus sollicitudin. Vestibulum nec leo est. Phasellus sagittis metus id sapien semper malesuada. Etiam vulputate leo lacus, eget feugiat velit laoreet non. Nam luctus blandit mi et viverra. Nullam enim est, mollis non ex id, ullamcorper posuere ligula. Quisque scelerisque scelerisque turpis, vitae tristique massa volutpat vel. Duis dapibus arcu justo. In hac habitasse platea dictumst.

Mauris nec sollicitudin nunc. In fringilla diam sed pulvinar rhoncus. Vivamus pulvinar ante fermentum enim congue aliquam. Sed vulputate dolor in maximus pharetra. Suspendisse potenti. Nulla ac ullamcorper mi. Donec bibendum odio porttitor justo porta, at fringilla lectus porttitor. Aenean cursus volutpat nisl, rutrum auctor ante dignissim ut. Mauris in placerat ex.

Donec hendrerit suscipit quam, id volutpat sem accumsan ut. Nulla laoreet, orci non fermentum finibus, arcu dolor venenatis lectus, at fringilla urna dolor eu ligula. Phasellus eleifend varius quam, sit amet egestas lectus fermentum sed. Donec ac sagittis enim, id feugiat enim. Phasellus at risus semper, semper mi quis, tincidunt purus. Maecenas posuere ultricies purus sed iaculis. Nunc a enim vehicula, ultricies purus eget, mollis sem.`
  ];

  const outputs = ref(OUTPUTS_MOCK);
</script>

<style scoped>
  .swiper-pagination {
    position: relative;
    bottom: 0 !important;
    margin-top: 20px;
    text-align: center;
  }

  :deep(.swiper-pagination-bullet-active) {
    background: var(--ion-color-medium);
  }
</style>

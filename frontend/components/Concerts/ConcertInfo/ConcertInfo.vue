<template>
  <div class="concert__container">
    <p class="concert__description">{{ concert && concert.description }}</p>
  </div>
</template>
<script>
export default {
  name: 'ConcertInfo',
  props: ['concert'],
}
</script>
<style lang="scss">
.concert {
  &__container {
    height: 65vh;
    overflow: auto;
  }
  &__description {
    @apply text-white text-justify px-2;
  }
}
</style>

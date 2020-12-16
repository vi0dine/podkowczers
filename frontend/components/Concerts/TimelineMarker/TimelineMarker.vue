<template>
  <div class="wrapper" @click="$emit('click', { date })">
    <div v-if="active" class="marker__container">
      <img src="~/assets/svg/active-marker.svg" />
      <span class="marker__text--active">{{ date }}</span>
    </div>
    <div v-else class="marker__container">
      <img src="~/assets/svg/marker.svg" />
      <span class="marker__text--inactive">{{ date }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TimelineMarker',
  props: ['active', 'date'],
}
</script>
<style lang="scss">
.wrapper {
  &:hover {
    cursor: pointer;
  }
}
.marker {
  &__container {
    position: relative;
  }
  &__text {
    &--inactive {
      @apply absolute text-gray-600 font-bold;
      font-size: 0.8rem;
      top: 32px;
      left: 28px;
    }
    &--active {
      @apply absolute text-gray-600 font-bold;
      font-size: 1.25rem;
      top: 47px;
      left: 40px;
    }
  }
}
</style>

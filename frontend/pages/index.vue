<template>
  <div class="intro">
    <img src="~/assets/svg/drawing1.svg" class="drawing--shapes" />
    <img src="~/assets/svg/drawing2.svg" class="drawing--music" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.intro {
  @apply h-full;
  position: relative;
}
.drawing {
  &--shapes {
    position: absolute;
    width: 1200px;
    height: 553px;
    left: 11px;
    bottom: 150px;
  }
  &--music {
    position: absolute;
    width: 774px;
    height: 591px;
    left: 930px;
    bottom: 400px;
  }
}
</style>

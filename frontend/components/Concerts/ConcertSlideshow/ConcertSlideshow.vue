<template>
  <div class="flex flex-col justify-between">
    <img
      class="flex flex-1 p-2"
      :src="'http://placehold.it/1200x30' + (concert ? concert.id : 0)"
    />
    <img
      class="flex flex-1 p-2"
      :src="'http://placehold.it/1200x30' + (concert ? concert.id : 0)"
    />
  </div>
</template>
<script>
export default {
  name: 'ConcertSlideshow',
  props: ['concert'],
}
</script>
<style></style>

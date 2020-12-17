<template>
  <div class="timeline__wrapper">
    <div class="timeline__markers">
      <TimelineMarker
        v-for="concert in concerts"
        :key="concert.id"
        :is-active="concert && active && active.id === concert.id"
        :concert="concert"
        @click="setActiveMarker"
      />
    </div>
    <div class="timeline" />
  </div>
</template>
<script>
import TimelineMarker from '@/components/Concerts/TimelineMarker/TimelineMarker'
export default {
  name: 'Timeline',
  components: { TimelineMarker },
  props: ['concerts', 'active'],
  methods: {
    setActiveMarker(payload) {
      this.$emit('concertChange', { id: payload.id })
    },
  },
}
</script>
<style lang="scss">
.timeline {
  &__wrapper {
    @apply absolute flex w-full justify-center items-end;
    height: 5vh;
    bottom: 20px;
  }

  &__markers {
    @apply absolute flex flex-row w-full justify-evenly items-end;
    bottom: 0;
  }

  @apply absolute;
  height: 5px;
  width: calc(100vw - 50px);
  background-color: aliceblue;
  border-radius: 4px;
}
</style>

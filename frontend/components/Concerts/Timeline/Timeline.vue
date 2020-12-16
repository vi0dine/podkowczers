<template>
  <div class="timeline__wrapper">
    <div class="timeline__markers">
      <TimelineMarker
        v-for="concert in concerts"
        :key="concert.date"
        :active="activeMarker === concert.date"
        :date="concert.date"
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
  data() {
    return {
      concerts: [
        {
          date: '01/2013',
        },
        {
          date: '01/2014',
        },
        {
          date: '12/2019',
        },
      ],
      activeMarker: null,
    }
  },
  methods: {
    setActiveMarker(payload) {
      this.activeMarker = payload.date
    },
  },
}
</script>
<style lang="scss">
.timeline {
  &__wrapper {
    @apply absolute flex w-full justify-center;
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

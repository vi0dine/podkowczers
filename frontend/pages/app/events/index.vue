<template>
  <div class="events-container">
    <EventTile v-for="event in events" :event="event" :key="event.id"/>
  </div>
</template>

<script>
  import EventTile from '../../../components/app/events/EventTile'

  export default {
    layout: 'app',
    components: {
      EventTile: EventTile
    },
    async fetch ({ store }) {
      await store.dispatch('events/fetchEvents');
    },
    computed: {
      events() {
        return this.$store.state.events.events;
      }
    }
  }
</script>

<style scoped>
  .events-container {
    padding: 1rem 2rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }
</style>

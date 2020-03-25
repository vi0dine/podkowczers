<template>
  <div>
    <div class="events-header">
      <span class="title">Wydarzenia:</span>
      <v-btn @click="goToAddForm()" color="primary" v-if="admin">
        <v-icon style="margin-right: 10px">mdi-plus-circle</v-icon>
        <span>Dodaj wydarzenie</span>
      </v-btn>
    </div>
    <div class="events-container">
      <EventTile v-for="event in events" :event="event" :key="event.id"/>
    </div>
  </div>
</template>

<script>
  import EventTile from '../../../components/app/events/EventTile'

  export default {
    layout: 'app',
    components: {
      EventTile: EventTile
    },
    async fetch({ store }) {
      await store.dispatch('events/fetchEvents')
    },
    computed: {
      events() {
        return this.$store.state.events.events
      },
      admin() {
        return this.$store.state.auth.user.role === 'admin'
      }
    },
    methods: {
      goToAddForm() {
        this.$router.push({ path: '/app/events/new' })
      }
    }
  }
</script>

<style scoped lang="scss">
  .events-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2rem;

    .title {
      font-family: $main-font !important;
      font-size: 28pt !important;
    }
  }

  .events-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }
</style>

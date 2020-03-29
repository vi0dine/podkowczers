<template>
  <div>
    <p class="event-title">{{ event.concert }}</p>
    <p class="event-place">{{ event.place.name }}</p>
    <Audience
      :place="event.place"
      :allow-prereservation=false
      :preselected="unavailableSeats"
    />
  </div>
</template>

<script>
  import AudiencePlan from '../../../components/app/events/AudiencePlan'

  export default {
    layout: 'app',
    components: {
      Audience: AudiencePlan
    },
    computed: {
      event () {
        return this.$store.state.events.events.find(event => event.id == this.$route.params.id)
      },
      unavailableSeats () {
        return this.event.tickets.filter(ticket => ticket.reserved)
      }
    },
  }
</script>

<style lang="scss">
  .event-title {
    font-family: $main-font;
    color: $WHITE;
    font-size: 32px;
  }
  .event-place {
    font-family: $main-font;
    color: $WHITE;
    font-size: 24px;
  }
</style>

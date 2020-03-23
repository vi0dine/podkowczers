<template>
  <v-card
    nuxt
    :to="'/app/events/' + event.id"
    class="event-tile"
  >
    <div class="event-tile-info">
      <v-card-title
        class="event-tile-title"
      >
        {{ event.concert }}
      </v-card-title>
      <v-card-subtitle
        class="event-tile-subtitle"
      >
        {{ event.place }}
      </v-card-subtitle>
    </div>

    <div class="event-tile-actions">
      <v-btn
        icon
        class="ticket-button"
        width="70px"
        height="70px"
        nuxt
        to="/app/concerts"
      >
        <v-icon
          size="60px"
          color="#FFC857"
        >mdi-ticket</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
  export default {
    props: ['event']
  }
</script>

<style scoped lang="scss">
  .event-tile {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    background-color: $RED;
  }

  .event-tile-info {
    flex-direction: column;
  }

  .event-tile-actions {
    padding-right: 2rem;
  }

  .event-tile-title {
    font-family: $main-font;
    color: $MUSTARD;
    font-size: 21pt;
    margin-bottom: .5rem;
  }
  .event-tile-subtitle {
    font-family: $main-font;
    color: $WHITE;
    font-size: 18pt;
  }
</style>

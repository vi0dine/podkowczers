<template>
    <v-card
      nuxt
      :to="'/app/concerts/' + concert.id"
      class="concert-tile"
    >
      <v-img
        class="concert-image"
        position="center"
        :src="concertImage"
      >
        <v-card-title class="concert-tile-title">{{ concert.name }}</v-card-title>
      </v-img>
    </v-card>
</template>

<script>
  export default {
    props: ['concert'],
    computed: {
      concertImage() {
        if (this.concert.images && this.concert.images.length > 0) {
          return `${process.env.baseUrl}${this.concert.images[0]}`
        } else {
          return 'http://via.placeholder.com/200x200'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .concert-tile {
    display: flex;
    flex: 1 1 25%;
    margin: 15px 10px;
  }

  .concert-tile-title {
    font-family: $main-font;
    font-size: 28pt;
    font-weight: bold;
    text-shadow: 2px 2px 7px $BLACK;
    color: $MUSTARD;
  }

  .concert-image {
    height: 300px;
  }
</style>

<template>
  <div class="concert-content">
    <div>
      <h1 class="concert-title">{{ concert.name }}</h1>
    </div>
    <div>
      <p class="concert-description">{{ concert.description }}</p>
    </div>
    <div>
      <v-carousel
        v-if="concert.images.length > 0"
        cycle
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(image, i) in concert.images"
          :key="i"
        >
          <v-img
            position="top"
            contain
            height="100%"
            :src="imagePath(image)"
          />
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'app',
    computed: {
      concert () {
        return this.$store.state.concerts.concerts.find(concert => concert.id == this.$route.params.id)
      }
    },
    methods: {
      imagePath (image) {
        return `${process.env.baseUrl}${image}`
      }
    }
  }
</script>

<style scoped lang="scss">
  .concert-content {
    height: 100%;
    padding: 1rem 2rem 1rem 1rem;
    display: flex;
    flex-direction: column;
  }

  .concert-title {
    font-family: $main-font;
    color: $MUSTARD;
    font-size: 21pt;
  }

  .concert-description {
    overflow-wrap: break-word;
    text-align: justify;
    font-family: $main-font;
    color: $WHITE;
    font-size: 16pt;
  }
</style>

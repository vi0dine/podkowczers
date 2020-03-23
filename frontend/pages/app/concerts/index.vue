<template>
  <div class="concerts-container">
    <ConcertTile v-for="concert in concerts" :concert="concert" :key="concert.id"/>
  </div>
</template>

<script>
  import ConcertTile from '../../../components/app/concerts/ConcertTile'

  export default {
    layout: 'app',
    components: {
      ConcertTile: ConcertTile
    },
    async fetch ({ store }) {
      await store.dispatch('concerts/fetchConcerts');
    },
    computed: {
      concerts() {
        return this.$store.state.concerts.concerts;
      }
    }
  }
</script>

<style scoped>
  .concerts-container {
    padding: 1rem 2rem 1rem 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }
</style>

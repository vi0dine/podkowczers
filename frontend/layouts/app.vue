<template>
  <v-app dark>
    <v-content class="app-content">
        <nuxt />
    </v-content>
    <Drawer/>
  </v-app>
</template>

<script>
  import Drawer from '../components/app/Drawer'
  export default {
    components: { Drawer }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

  a {
    text-decoration: none !important;
  }

  .app-content {
    width: 85vw;
  }
</style>

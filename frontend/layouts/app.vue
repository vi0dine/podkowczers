<template>
  <v-app dark>
    <v-container fluid>
      <v-content class="app-content">
        <nuxt />
      </v-content>
    </v-container>
    <Drawer/>
  </v-app>
</template>

<script>
  import Drawer from '../components/app/Drawer'
  export default {
    middleware: 'authenticated',
    components: { Drawer }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

  a {
    text-decoration: none !important;
  }

  .app-content {
    width: 83vw;
  }
</style>

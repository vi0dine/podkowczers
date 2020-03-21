<template>
  <v-app dark>
    <v-container fluid>
      <v-row align="center" justify="center" style="height: 100vh;">
        <v-col cols="12">
          <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    layout: 'empty',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        pageNotFound: 'Błąd 404',
        otherError: 'Wystąpił błąd'
      }
    },
    head() {
      const title =
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError
      return {
        title
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-family: 'Muli', sans-serif;
    color: #f8f8f8;
    font-size: 70px;
  }
</style>

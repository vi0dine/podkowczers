<template>
  <p>{{user.email}}</p>
</template>

<script>
  export default {
    layout: 'app',
    computed: {
      user () {
        return this.$store.state.users.users.find(user => user.id == this.$route.params.id)
      }
    }
  }
</script>

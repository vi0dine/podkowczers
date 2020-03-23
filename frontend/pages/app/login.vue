<template>
  <v-container class="form-container">
    <img src="/logo.png" class="logo">
    <LoginForm />
  </v-container>
</template>

<script>
  import LoginForm from '../../components/app/login/LoginForm'

  export default {
    components: {
      LoginForm: LoginForm
    }
  }
</script>

<style lang="scss">
  .logo {
    width: auto;
    height: 200px;
    margin-bottom: 1rem;
  }

  .form-container {
    display: flex;
    height: 90vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

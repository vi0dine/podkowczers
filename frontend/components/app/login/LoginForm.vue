<template>
  <form class="form">
    <v-text-field
      class="form-input"
      label="Email"
      required
      color="#FFC857"
      v-model="email"
      :loading="loading"
      :error-messages="emailErrors"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      class="form-input"
      label="Hasło"
      required
      color="#FFC857"
      type="password"
      v-model="password"
      :loading="loading"
      :error-messages="passwordErrors"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-btn :disabled="this.$v.$invalid" class="form-button" @click="submit">ZALOGUJ</v-btn>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      email: { required, email },
      password: { required },
    },

    data: () => ({
      email: '',
      password: ''
    }),

    computed: {
      loading() {
        return this.$store.state.users.loading
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.required && errors.push('Email nie może być pusty.')
        !this.$v.email.email && errors.push('Podaj prawidłowy adres email.')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Hasło nie może być puste.')
        return errors
      },
    },

    methods: {
      submit () {
        this.$store.dispatch('users/login', {email: this.email, password: this.password})
        .then(() => {
          this.$router.push({path: '/app'});
        });
      }
    }
  }
</script>

<style lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form-input {
    width: 30rem;
  }
  .form-button {
    background-color: $RED !important;
    margin-top: 3rem;
    width: 25rem;
  }
</style>

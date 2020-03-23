<template>
  <v-navigation-drawer
    width="15vw"
    permanent
    fixed
    right
  >
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ email }}</v-list-item-title>
          <v-list-item-subtitle>{{ role }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list>
      <NuxtLink to="/app/concerts">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-playlist-music</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Koncerty</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </NuxtLink>
      <NuxtLink to="/app/events">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-calendar-text</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Wydarzenia</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </NuxtLink>
      <NuxtLink to="/app/tickets">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-ticket</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Bilety</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </NuxtLink>
    </v-list>

    <template v-if="role === 'Administrator'">
      <v-divider></v-divider>
      <v-list>
        <NuxtLink to="/app/users">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-supervisor</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Użytkownicy</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </NuxtLink>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
  export default {
    computed: {
      email () {
        return this.$store.state.auth.user.email;

      },
      role () {
        const role = this.$store.state.auth.user.role;

        switch (role) {
          case 'user':
            return 'Widz';
          case 'admin':
            return 'Administrator';
        }
      }
    }
  }
</script>

<style>

</style>

<template>
  <v-container fluid>
    <v-data-table
      :items="users"
      :headers="headers"
      :options="tableOptions"
      @click:row="({id}) => editUser(id)"
    >
      <template v-slot:item.actions="{ item }">
        <Confirm
          question="Czy na pewno chcesz usunąć użytkownika?"
          v-on:confirm="confirmDeletion(item.id)"
        >
          <v-icon
            class="action-icon delete">
            mdi-delete
          </v-icon>
        </Confirm>

        <v-icon
          class="action-icon coins"
          @click.stop="addCoin(item.id)"
        >
          mdi-circle-multiple-outline
        </v-icon>

        <Confirm
          :question="item.role === 'user' ? 'Czy na pewno chcesz awansować użytkownika?' : 'Czy na pewno chcesz zdegradować użytkownika?'"
          v-on:confirm="item.role === 'user' ? confirmPromoting(item.id) : confirmDemoting(item.id)"
        >
          <v-icon
            v-if="item.role === 'user'"
            class="action-icon promote">
            mdi-account-plus
          </v-icon>

          <v-icon
            v-else
            class="action-icon promote">
            mdi-account-minus
          </v-icon>
        </Confirm>

      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import ConfirmDialog from '../../../components/app/users/ConfirmDialog'

  export default {
    layout: 'app',
    components: {
      Confirm: ConfirmDialog
    },
    data() {
      return {
        headers: [
          { text: 'ID', value: 'id', width: '5%', class: 'table-column' },
          { text: 'Email', value: 'email', width: '60%', class: 'table-column' },
          { text: 'Rola', value: 'role', width: '20%', class: 'table-column'},
          { text: 'Monety', value: 'coins', width: '5%', align: 'center', class: 'table-column' },
          { text: '', value: 'actions', width: '10%', class: 'table-column' }
        ],
        tableOptions: {
          sortBy: ['id']
        }
      }
    },
    async fetch({ store }) {
      await store.dispatch('users/fetchUsers')
    },
    computed: {
      users() {
        return this.$store.state.users.users
      }
    },
    methods: {
      editUser(id) {
        this.$router.push({ path: `/app/users/${id}` })
      },
      async confirmDeletion(id) {
        await this.$axios.$delete(`/api/v1/users/${id}`)
        await this.$store.dispatch('users/fetchUsers')
      },
      async addCoin(id) {
        await this.$axios.$post(`/api/v1/users/${id}/coin`)
        await this.$store.dispatch('users/fetchUsers')
      },
      async confirmPromoting(id) {
        await this.$axios.$post(`/api/v1/users/${id}/promote`)
        await this.$store.dispatch('users/fetchUsers')
      },
      async confirmDemoting(id) {
        await this.$axios.$post(`/api/v1/users/${id}/demote`)
        await this.$store.dispatch('users/fetchUsers')
      }
    }
  }
</script>

<style lang="scss">
  .action-icon {
    &.delete {
      color: $RED;
    }

    &.promote {
      color: $WHITE;
    }

    &.coins {
      color: $MUSTARD;
    }
  }

  .text-start {
    font-family: $main-font !important;
  }
</style>

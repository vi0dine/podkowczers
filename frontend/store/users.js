export const state = () => ({
  users: [],
  loading: false
})

export const mutations = {
  login (state, { loading }) {
      state.loading = loading;
  },
  fetchUsers (state, { users }) {
      state.users = users;
  }
}

export const actions = {
  async login ({ commit }, { email, password }) {
    commit('login', { loading: true })
    await this.$auth.login({ data: {
        email: email,
        password: password,
        grant_type: "password"
    }}).then(async ({data: user}) => {
      await this.$auth.setToken('local', 'Bearer ' + user.access_token);
      await this.$auth.setRefreshToken('local', user.refresh_token);
      await this.$auth.setUser({ id: user.id, email: user.email, role: user.role })
    }).catch((e) => {
      console.log(e)
    });

    commit('login', { loading: false });
  },
  async fetchUsers ({ commit }) {
    const users = await this.$axios.$get('/api/v1/users')
    console.log(users)
    commit('fetchUsers', users)
  }
}

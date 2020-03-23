export const state = () => ({
  loading: false
})

export const mutations = {
  login (state, { loading }) {
      state.loading = loading;
  }
}

export const actions = {
  async login ({ commit }, { email, password }) {
    commit('login', { loading: true })
    await this.$auth.login({ data: {
        email: email,
        password: password,
        grant_type: "password",
        client_id: "ZMyNFekj1F7ehLowwb1sx1DAKYIhOqTGQzeznyd2_ik",
        client_secret: "7hRqQ9WApXSuZ2CH4xygSGUSSn6OnUDb-pVPjDthPRY"
    }}).then(async ({data: user}) => {
      await this.$auth.setToken('local', 'Bearer ' + user.access_token);
      await this.$auth.setRefreshToken('local', user.refresh_token);
      await this.$auth.setUser({ id: user.id, email: user.email, role: user.role })
      this.$router.go({ path: '/app' })
    }).catch(() => {
      this.$router.go({ path: '/app/login' })
    });

    commit('login', { loading: false });
  }
}

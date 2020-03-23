export const state = () => ({
  concerts: [],
  loading: false
})

export const mutations = {
  fetchConcerts (state, { concerts, loading }) {
    state.concerts = concerts;
    state.loading = loading;
  }
}

export const actions = {
  async fetchConcerts ({ commit }) {
    commit('fetchConcerts', { concerts: null, loading: true })
    const { concerts } = await this.$axios.$get('/api/v1/concerts');
    commit('fetchConcerts', { concerts: concerts, loading: false });
  }
}

export const state = () => ({
  events: [],
  loading: false
})

export const mutations = {
  fetchEvents (state, { events, loading }) {
    state.events = events;
    state.loading = loading;
  }
}

export const actions = {
  async fetchEvents ({ commit }) {
    commit('fetchEvents', { events: null, loading: true })
    const { events } = await this.$axios.$get('/api/v1/events');
    commit('fetchEvents', { events: events, loading: false });
  }
}

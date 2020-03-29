export const state = () => ({
  events: [],
  loading: false
})

export const mutations = {
  fetchEvents (state, { events, loading }) {
    state.events = events;
    state.loading = loading;
  },
  fetchPlaces (state, { places, loading }) {
    state.places = places;
    state.loading = loading;
  }
}

export const actions = {
  async fetchEvents ({ commit }) {
    commit('fetchEvents', { events: null, loading: true })
    const { events } = await this.$axios.$get('/api/v1/events');
    commit('fetchEvents', { events: events, loading: false });
  },
  async fetchPlaces ({ commit }) {
    commit('fetchPlaces', { places: null, loading: true })
    const { places } = await this.$axios.$get('/api/v1/places');
    commit('fetchPlaces', { places: places, loading: false });
  }
}

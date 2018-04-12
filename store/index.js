export const state = () => ({
  loading: false,
  error: null
})
export const getters = {
  error(state) {
    return state.error
  },
  loading(state) {
    return state.loading
  }
}

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  clearError(state) {
    state.error = null
  }
  
}

export const actions = {
  clearError({ commit }, payload) {
    commit('clearError')
  }
}

export const strict = false

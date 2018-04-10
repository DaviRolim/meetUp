import lodash from 'lodash'
import firebase from 'firebase'
export const state = () => ({
  loadedMeetups: [
    {
      imageUrl: 'https://www.viajali.com.br/wp-content/uploads/2017/09/seul-7.jpg',
      id: 'simpleID',
      title: 'Meet Up in Seul (South Corea)',
      date: new Date(),
      location: 'Seul',
      description: 'Very good'
    },
    {
      imageUrl: 'https://www.myholidayguru.co.uk/wp-content/uploads/2017/10/Zuiderkerk-in-Amsterdam-iStock-528503566-2_titel.jpg',
      id: 'simple',
      title: 'Meet Up in Amsterdam (Holanda)',
      date: new Date(),
      location: 'Amsterdam',
      description: 'BEst place ever.'
    }
  ],
  user: null,
  loading: false,
  authError: null
})
export const getters = {
  getLoadedMeetups(state) {
    const cloned = lodash.clone(state.loadedMeetups)
    return cloned.sort((meetupA, meetupB) => {
      return meetupA.date > meetupB.date
    })
  },
  featuredMeetups(state, getters) {
    return getters.getLoadedMeetups.slice(0, 5)
  },
  getLoadedMeetup(state) {
    return (meetupId) => {
      return state.loadedMeetups.find(meetup => meetup.id === meetupId)
    }
  },
  user(state) {
    return state.user
  },
  error(state) {
    return state.authError
  },
  loading(state) {
    return state.loading
  }
}

export const mutations = {
  createMeetup(state, payload) {
    state.loadedMeetups.push(payload)
  },
  setUser(state, payload) {
    state.user = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.authError = payload
  },
  clearError(state) {
    state.authError = null
  }
}

export const actions = {
  createMeetup({ commit }, payload) {
    commit('createMeetup', payload)
  },
  signUserUp({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.uid,
          registeredMeetups: []
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
  },
  signUserIn({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', true)
        const newUser = {
          id: user.uid,
          registeredMeetups: []
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
  },
  clearError({ commit }, payload) {
    commit('clearError')
  }
}

export const strict = false

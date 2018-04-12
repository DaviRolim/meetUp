import lodash from 'lodash'
import firebase from 'firebase'
export const state = () => ({
  user: null
})
export const getters = {
  user(state) {
    return state.user
  }
}

export const mutations = {
  registerUserForMeetup(state, payload) {
    const id = payload.id
    // Try to register for a meetup that you're already registered
    if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
      return
    }
    state.user.registeredMeetups.push(id)
    state.user.fbKeys[id] = payload.fbKey
  },
  unregisterUserForMeetup(state, payload) {
    const registeredMeetups = state.user.registeredMeetups
    registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
    Reflect.deleteProperty(state.user.fbKeys, payload)
  },  
  setUser(state, payload) {
    state.user = {...payload, fbKeys: {}}
  }

  
}

export const actions = {
  registerUserForMeetup({ commit, getters }, payload) {
    commit('setLoading', true, {root: true})
    const user = getters.user
    firebase.database().ref('/users/' + user.id).child('/registrations/')
    .push(payload)
    .then(data => {
      commit('setLoading', false, {root: true})
      commit('registerUserForMeetup',{id: payload, fbKey: data.key})
    })
    .catch(error => {
      commit('setLoading', false, {root: true})
      console.log(error)
    })

  },
  unregisterUserForMeetup({ commit, getters}, payload) {
    commit('setLoading', true, {root: true})
    const user = getters.user
    if(!user.fbKeys) {
      return
    }
    const fbKey = user.fbKeys[payload]
    firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
    .remove()
    .then(() => {
      commit('setLoading', false, {root: true})
      commit('unregisterUserForMeetup', payload)
    })
    .catch(error => {
      commit('setLoading', false, {root: true})
      console.log(error)
    })
  },
  signUserUp({ commit }, payload) {
    commit('setLoading', true, {root: true})
    commit('clearError', {root: true})
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false, {root: true})
        const newUser = {
          id: user.uid,
          registeredMeetups: []
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false, {root: true})
        commit('setError', error)
        console.log(error)
      })
  },
  signUserIn({ commit }, payload) {
    commit('setLoading', true, {root: true})
    commit('clearError', {root: true})
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false, {root: true})
        const newUser = {
          id: user.uid,
          registeredMeetups: []
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false, {root: true})
        commit('setError', error)
        console.log(error)
      })
  },
  autoSignin({ commit, dispatch }, payload) {
    commit('setUser', { id: payload.uid, registeredMeetups: [] })
  },
  fetchUserData({commit,getters,rootGetters}, payload) {
    // example on how to use actions from another namespaced
    commit('setLoading', true, {root: true})
    firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
    .then(data => {
      const dataPairs = data.val()
      let registeredMeetups = []
      let swappedPairs = {}
      for (let key in dataPairs) {
        registeredMeetups.push(dataPairs[key])
        swappedPairs[dataPairs[key]] = key
      }
      const updatedUser = {
        id: getters.user.id,
        registeredMeetups: registeredMeetups,
        fbKeys: swappedPairs
      }
      commit('setLoading', false, {root: true})
      commit('setUser', updatedUser)
    })
    .catch(error => {
      commit('setLoading', false, {root: true})
      console.log(error)
    })
  },
  logout({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
  }
}

export const strict = false

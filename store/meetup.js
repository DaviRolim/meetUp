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
  },
  setLoadedMeetups(state, payload) {
    state.loadedMeetups = payload
  }
}

export const actions = {
  loadMeetups({ commit }) {
    commit('setLoading', true)
    firebase.database().ref('meetups').once('value')
      .then((data) => {
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            location: obj[key].location,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedMeetups', meetups)
        commit('setLoading', false)
      })
      .catch((error) => {
        commit('setLoading', false)
        console.log(error)
      })
  },
  createMeetup({ commit, getters }, payload) {
    let imageUrl
    let key
    firebase.database().ref('meetups').push({ ...payload, creatorId: getters.user.id })
      .then((data) => {
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image) // for files use put instead of push
      })
      .then(fileData => {
        imageUrl = fileData.metadata.downloadURLs[0]
        return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl })
      })
      .then(() => {
        commit('createMeetup', {
          ...payload,
          id: key,
          creatorId: getters.user.id,
          imageUrl: imageUrl
        })
      })
      .catch((error) => {
        console.log(error)
      })
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
  autoSignin({ commit }, payload) {
    commit('setUser', { id: payload.uid, registeredMeetups: [] })
  },
  logout({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
  },
  clearError({ commit }, payload) {
    commit('clearError')
  }
}

export const strict = false

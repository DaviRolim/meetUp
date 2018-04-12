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
  ]
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
  }
}

export const mutations = {
  createMeetup(state, payload) {
    state.loadedMeetups.push(payload)
  },
  updateMeetup(state, payload) {
    const meetup = state.loadedMeetups.find(meetup => meetup.id === payload.id)
    if (payload.title) {
      meetup.title = payload.title
    }
    if (payload.description) {
      meetup.description = payload.description
    }
    if (payload.date) {
      meetup.date = payload.date
    }
  },
  setLoadedMeetups(state, payload) {
    state.loadedMeetups = payload
  }
}

export const actions = {
  loadMeetups({ commit }) {
    commit('setLoading', true, {root: true})
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
        commit('setLoading', false, {root: true})
      })
      .catch((error) => {
        commit('setLoading', false, {root: true})
        console.log(error)
      })
  },
  createMeetup({ commit, getters, rootGetters }, payload) {
    let imageUrl
    let key
    let user = rootGetters['user/user']
    firebase.database().ref('meetups').push({ ...payload, creatorId: user.id })
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
          creatorId: user.id,
          imageUrl: imageUrl
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },
  updateMeetupData({ commit }, payload) {
    commit('setLoading', true, {root: true})
    const updateObj = {}
    if (payload.title) {
      updateObj.title = payload.title
    }
    if (payload.description) {
      updateObj.description = payload.description
    }
    if (payload.date) {
      updateObj.date = payload.date
    }
    firebase.database().ref('meetups').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false, {root: true})
        commit('updateMeetup', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false, {root: true})
      })
  }
}

export const strict = false

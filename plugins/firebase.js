import Firebase from 'firebase'
import Vue from 'vue'

var config = {
  apiKey: "AIzaSyBagzHm_VSCmRJm6yaTSTT1CYkS9aDpvEw",
  authDomain: "meetupvuetify.firebaseapp.com",
  databaseURL: "https://meetupvuetify.firebaseio.com",
  projectId: "meetupvuetify",
  storageBucket: "meetupvuetify.appspot.com",
  messagingSenderId: "757323975596"
};
const connection = Firebase.initializeApp(config)
const db = connection.database()
const auth = connection.auth()

Vue.prototype.$db = db
Vue.prototype.$auth = auth

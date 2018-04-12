import Firebase from 'firebase'
import Vue from 'vue'

var config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};
const connection = Firebase.initializeApp(config)
const db = connection.database()
const auth = connection.auth()

Vue.prototype.$db = db
Vue.prototype.$auth = auth

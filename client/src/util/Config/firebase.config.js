import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyBL5G_g4WIWZ-bzgFZwhednd6oncBHMPwE',
  databaseURL: 'https://calculator-b25f2.firebaseio.com',
  projectId: 'calculator-b25f2',
  appId: '1:69513791964:web:c55a594ebc50978631a719',
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const operationsCollection = db.collection('operations')

// export utils/refs
export {
  db,
  auth,
  operationsCollection,
}

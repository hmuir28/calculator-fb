import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - configuration credentials
const firebaseConfig = {
  apiKey: '',
  databaseURL: '',
  projectId: '',
  appId: '',
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

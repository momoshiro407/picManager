import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC-qf0VVzVnvq6TBGl5ya8hGr8V4rAqiwk",
  authDomain: "pic-manager-782ad.firebaseapp.com",
  projectId: "pic-manager-782ad",
  storageBucket: "pic-manager-782ad.appspot.com",
  messagingSenderId: "819335506156",
  appId: "1:819335506156:web:44358fc62c888d1d181dc9"
};

// initialize firebase
firebase.initializeApp(firebaseConfig)

// initialize service
const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { auth, firestore, storage, timestamp }
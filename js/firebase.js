import { initializeApp } from 'firebase/app'
import {
    getFirestore
    // collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc,
    // query, where,
    // orderBy, serverTimestamp,
    // getDoc
} from 'firebase/firestore'
import {
    getAuth
    // createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword,
    // onAuthStateChanged
} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAPnM2OvmJnMJSc4lgk39MkZnrb2x7dnhs",
    authDomain: "boarding-buddy-1.firebaseapp.com",
    projectId: "boarding-buddy-1",
    storageBucket: "boarding-buddy-1.appspot.com",
    messagingSenderId: "524014652013",
    appId: "1:524014652013:web:aa6f0b1c732dc471348d64"
  }

//init firebase app
const app = initializeApp(firebaseConfig)
//init services
const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth, app}
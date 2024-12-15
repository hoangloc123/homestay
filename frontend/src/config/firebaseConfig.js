// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// const FIREBASE_API_KEY = 'AIzaSyDWz6FYGMTCiEZGI_x-3AlROIMo1a_0HDU'
// const FIREBASE_AUTH_DOMAIN = 'homestays-fcb33.firebaseapp.com'
// const FIREBASE_APP_ID = 'homestays-fcb33'
// const FIREBASE_MESSAGING_SENDER_ID = 'homestays-fcb33.firebasestorage.app'
// const FIREBASE_PROJECT_ID = '242023743018'
// const FIREBASE_STORAGE_BUCKET = '1:242023743018:web:6ac92d0bb9e5df51be4d53'

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: "AIzaSyA38Liip3bPVJem9J6MtyP6wEviLBPzcYM",
    authDomain: "webnovel-eee3f.firebaseapp.com",
    projectId: "webnovel-eee3f",
    storageBucket: "webnovel-eee3f.appspot.com",
    messagingSenderId: "201939309789",
    appId: "1:201939309789:web:b0a089abb9803a2ffb7734",
    measurementId: "G-LP0JPHZ93F"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
initializeFirestore(app, {
    ignoreUndefinedProperties: true, // Avoid errors with undefined values
})

// Initialize Firebase services
const auth = getAuth(app)
const storage = getStorage(app)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider, storage };

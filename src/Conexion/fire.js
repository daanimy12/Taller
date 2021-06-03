import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyA9nXx-TRdgng1Q3Mb-X0tXP-xXSyIWBmc",
    authDomain: "ciber-3c532.firebaseapp.com",
    databaseURL: "https://ciber-3c532.firebaseio.com",
    projectId: "ciber-3c532",
    storageBucket: "ciber-3c532.appspot.com",
    messagingSenderId: "920959712240",
    appId: "1:920959712240:web:a58e7d0d46ac756b"
};
firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebase.database()
export const firebaseAuth = firebase.auth()
export const firebaseStorage =firebase.storage()
export default firebase

import firebase from "firebase"
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAeKbyrFaSV2cKak_qRhP0mD_DX2CF2R6E",
    authDomain: "tallerdaniel-7fa3d.firebaseapp.com",
    databaseURL: "https://tallerdaniel-7fa3d-default-rtdb.firebaseio.com",
    projectId: "tallerdaniel-7fa3d",
    storageBucket: "tallerdaniel-7fa3d.appspot.com",
    messagingSenderId: "538911823435",
    appId: "1:538911823435:web:97ee282c427506ee5fdfce",
    measurementId: "G-7YKSJRMEQW"
};
firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebase.database()
export const firebaseAuth = firebase.auth()
export const firebaseStorage =firebase.storage()
export default firebase

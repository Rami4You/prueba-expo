import * as firebase from "firebase";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJpu9Xk-tdr57Riep3eWLRI4Zl22HsbH4",
  authDomain: "pos1-bef91.firebaseapp.com",
  databaseURL: "https://pos1-bef91-default-rtdb.firebaseio.com",
  projectId: "pos1-bef91",
  storageBucket: "pos1-bef91.appspot.com",
  messagingSenderId: "241168661645",
  appId: "1:241168661645:web:52c321fbecef6e87aa36c4",
  measurementId: "G-8DBZFMRJZJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
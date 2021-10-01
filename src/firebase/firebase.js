import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6kEqTetnOsw9aP7tTG1XvaiOUosGVepc",
  authDomain: "recipeapp09.firebaseapp.com",
  projectId: "recipeapp09",
  storageBucket: "recipeapp09.appspot.com",
  messagingSenderId: "809658164414",
  appId: "1:809658164414:web:4d63db1c1e13c715582aef"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
///firebase.analytics();

export const db = firebase.firestore();
export const auth = firebase.auth()
export default firebase
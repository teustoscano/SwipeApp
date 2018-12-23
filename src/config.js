import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCc0ZV3OLQsvHW7DyXMSilvCU0bXy8PCpc",
    authDomain: "swipe-habit.firebaseapp.com",
    databaseURL: "https://swipe-habit.firebaseio.com",
    projectId: "swipe-habit",
    storageBucket: "swipe-habit.appspot.com",
    messagingSenderId: "1041128462194"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })
export default firebase;
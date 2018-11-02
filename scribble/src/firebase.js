import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyC2QAL2O2Q9xEakoXXDaM2NtfRyRa8OgRo",
  authDomain: "scribble-sean.firebaseapp.com",
  databaseURL: "https://scribble-sean.firebaseio.com",
  projectId: "scribble-sean",
  storageBucket: "scribble-sean.appspot.com",
  messagingSenderId: "543071412494"
};

firebase.initializeApp(config);

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {window.location = 'Calendar'}
// });

export default firebase;
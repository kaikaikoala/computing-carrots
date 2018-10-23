import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCVwb10VKUD-jKFcgayd_wN3pjBCLlkd9w",
    authDomain: "scribble-e9588.firebaseapp.com",
    databaseURL: "https://scribble-e9588.firebaseio.com",
    projectId: "scribble-e9588",
    storageBucket: "scribble-e9588.appspot.com",
    messagingSenderId: "906391355898"
  };
firebase.initializeApp(config);
export default firebase;
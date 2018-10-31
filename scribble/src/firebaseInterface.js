import firebase from './firebase.js';

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

// export function firebaseGetCalendar() {
//     var databaseRef = firebase.database().ref('events/someUniqueEventID');
  
//     return new Promise(function (resolve, reject) {
//       databaseRef.on('value', function(snapshot) {
//           if (snapshot != null) {
//             resolve(snapshot.val())
//           } else {
//             reject('Something bad happened');
//           }
//         });
//     });
//   }

export function firebaseGetCalendar() {
    var databaseRef = firebase.database().ref('events/someUniqueEventID');
  
    return new Promise(function (resolve, reject) {
      databaseRef.on('value', function(snapshot) {
          if (snapshot != null) {
            resolve(snapshot.val())
          } else {
            reject('Something bad happened');
          }
        });
    });
}
  
export function firebaseRegister(email, password) {
firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error)
                    console.log(errorCode)
                    window.location = '404.html'
                })
                .then(function(values) {
                    // make sure we actually have values
                    if (values == false) {
                    console.log("problem!!!")
                    }

                    // prepare data before we put it in the database
                    var user = values.user;
                    var userUID = user.uid;
                    var userEmail = user.email;

                    // add new user to the database
                    db.collection("users").doc(userUID).set({
                        email: userEmail,
                        first: "",
                        last: "",
                        createdEvents: [],
                        invitedEvents: [],
                        contacts: [],
                    }, { merge: true })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });

                    // add a email : UID map to the database
                    db.collection("emailUIDMap").doc(userEmail).set({
                        uid: userUID,
                    }, { merge: true })
                    .then(function() {
                        // take the user to the Calendar
                        window.location = 'Calendar';
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
                });
}

// PLEASE DONT PASS IN THE SAME DATE AND TIME TWICE :^)
// Takes an eventID string and a proper timestamp string
export function addTime(eventID, dateTime) {
const eventRef = db.collection("events").doc(eventID);
const getOptions = { source: 'server' };

// get our current event from the database
eventRef.get(getOptions).then(function(event) {
    let avalibilityArray = [];
    event.data().invited.forEach(uid => {
        avalibilityArray.push({ [uid] : false});
    });

    const eventObject = {
        date : new Date(dateTime),
        avalibility : avalibilityArray,
    }

    // add our eventObject to our dates array
    db.collection("events").doc(eventID).set({
        dates: firebase.firestore.FieldValue.arrayUnion(eventObject),
    }, { merge: true })
    .then(function() {
        console.log("finished")
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}).catch(function(error) {
    console.log("Error getting cached document:", error);
});
}

// Takes an eventID string and an array of emails
export function inviteUsers(eventID, userEmails) {
// for each user email
// look up their id
// add event id to their list of invitedEvents

// for the single event
// add each person to the invited list
// add each people to each existing date

    userEmails.forEach(email => {
        // make requests for emailUIDMap
        const emailUIDMapRef = db.collection("emailUIDMap").doc(email);
        const getOptions = { source: 'server' };

        // get our userID from the database
        emailUIDMapRef.get(getOptions).then(function(user) {
            const uid = user.data().uid;

            //add the event id to each user's invitedEvents list
            const userRef = db.collection("users").doc(uid);
            userRef.update({
                invitedEvents: firebase.firestore.FieldValue.arrayUnion(eventID)
            });

            // add the userID to the event invited list
            const eventRef = db.collection("events").doc(eventID);
            eventRef.update({
                invited: firebase.firestore.FieldValue.arrayUnion(uid)
            });

            // get the dates data
            const eventsRef = db.collection("emailUIDMap").doc(eventID);
            eventsRef.get(getOptions).then(function(events) {
                let eventsDatesData = events.data().dates;

                eventsDatesData.forEach(element => {
                    element.avalibility.push({[uid] : false})
                });
                
                eventRef.update({
                    dates: firebase.firestore.FieldValue.arrayUnion(eventsDatesData)
                });
            });


        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });
    });
}

// creates event and returns the id of the event
export function addEvent() {
    const user = firebase.auth().currentUser;

    if (user) {
        const userID = user.uid;
    
        db.collection("events").add({
            creator: userID,
            invited: [userID],
            dates: [],
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);

            // get the dates data
            const userRef = db.collection("users").doc(userID);
            userRef.update({
                createdEvents: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            });

            return docRef.id; // not sure if this will actually return
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            return null;
        });
    } else {
        console.log("no user signed in");
        return null;
    }
}
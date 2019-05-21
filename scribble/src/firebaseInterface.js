import firebase from './firebase.js';

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export function returnUserID() {
    var user = firebase.auth().currentUser;

    if(user) {
        return user.uid;
    } else {
        return null;
    }
}

export function firebaseGetCalendar() {
    return new Promise(function (resolve, reject) {
        var user = firebase.auth().currentUser;
        console.log("CURRENT USER: ", user);

        if (user) {
            const uid = user.uid;

            const userRef = db.collection("users").doc(uid);
            const getOptions = { source: 'server' };
            let events = [];

            userRef.get(getOptions).then(function(user) {
                const userData = user.data();

                // put every created event in events
                userData.createdEvents.forEach(event => {
                    events.push(event);
                });

                // // put every invited event in events
                userData.invitedEvents.forEach(event => {
                    events.push(event);
                });

                let eventRequests = [];

                events.forEach(eventID => {
                    eventRequests.push(db.collection("events").doc(eventID).get());
                });


                return Promise.all(eventRequests);
            }).then(function(localEvents) {
                // now we have all the data for each event
                let eventData = []

                localEvents.forEach(element => {
                    eventData.push(element.data());
                });

                for (let i = 0, len = eventData.length; i < len; i++) { 
                    console.log("appending id: ", events[i]);
                    eventData[i].eventID = events[i];
                    console.log("event id is: ", eventData[i].eventID)
                }

                resolve(eventData);
            }).catch(function(error) {

                console.log("Error: ", error);
          
            });
        } else {
            reject('no user');
        }

    });
}

export function firebaseGetCalendarDummy() {
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

export function firebaseSignIn(email, password) {
    // Firebase auth is an async function that takes other functions to run when it completes
    // catch() is run when there is an error and then() is run if it completes sucessfully
    firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(function(values) {
              if (values == false) {
                window.location = '404.html'
                return false
              }
              // route to some page where we show the user their stuff
              let unsub = firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  // User is signed in.
                  window.location = 'Calendar'
                } else {
                  // No user is signed in.
                  console.log("something bad happened");
                }
              });
              unsub();
            }).catch(function(error) {
                console.log("invalid sign in!")
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                return false
            });
  };
  
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

// addTime and inviteUsers need to return futures....

// PLEASE DONT PASS IN THE SAME DATE AND TIME TWICE :^)
// Takes an eventID string and a proper timestamp string
export function addTime(eventID, dateTime) {

    return new Promise(function (resolve, reject) {
        console.log("running add time")
        const eventRef = db.collection("events").doc(eventID);
        const getOptions = { source: 'server' };

        // get our current event from the database
        eventRef.get(getOptions).then(function(event) {
            let avalibilityArray = [];
            event.data().invited.forEach(uid => {
                avalibilityArray.push({ [uid] : false});
            });

            const eventObject = {
                date : dateTime,
                avalibility : avalibilityArray,
            }

            // add our eventObject to our dates array
            return db.collection("events").doc(eventID).set({
                dates: firebase.firestore.FieldValue.arrayUnion(eventObject),
            }, { merge: true })
        }).then(function() {
            resolve();
        })
        .catch(function(error) {
            console.log("Error getting cached document:", error);
            reject();
        });
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

    return new Promise(function (resolve, reject) {

        const getOptions = { source: 'server' };

        const userPromiseArray = []

        userEmails.forEach(function(email) {
            const emailUIDMapRef = db.collection("emailUIDMap").doc(email);
            userPromiseArray.push(emailUIDMapRef.get(getOptions));
        });

        const eventRef = db.collection("events").doc(eventID);
        let uidArray = [];
        
        // get all of our users from the database
        Promise.all(userPromiseArray).then(function(users) {
            let userUpdatePromiseArray = [];

            // put all their UIDs in an array
            users.forEach(function(user) {
                uidArray.push(user.data().uid);
            });

            // for each user, create a promise to update the database
            uidArray.forEach(function (uid) {
                //add the event id to each user's invitedEvents list
                const userRef = db.collection("users").doc(uid);

                userUpdatePromiseArray.push(
                    userRef.update({
                        invitedEvents: firebase.firestore.FieldValue.arrayUnion(eventID)
                    })
                );
            });

            // run all these promises and return the result in an array
            return Promise.all(userUpdatePromiseArray);
        }).then(function() {
            let eventUpdatePromiseArray = [];

            const eventRef = db.collection("events").doc(eventID);

            // for each user, add them to the list of invites on the event
            uidArray.forEach(function(uid) {
                eventUpdatePromiseArray.push(
                    eventRef.update({
                        invited: firebase.firestore.FieldValue.arrayUnion(uid)
                    })
                );
            });

            return Promise.all(eventUpdatePromiseArray);
        }).then(function() {

            // get the dates data
            return eventRef.get(getOptions);
        }).then(function(events) {
            let eventsDatesData = events.data().dates;

            eventsDatesData.forEach(element => {
                uidArray.forEach(uid => {
                    element.avalibility.push({[uid] : false})
                })
            });

            console.log("eventsDatesData is :" ,eventsDatesData);
            
            return eventRef.update({
                dates: eventsDatesData
            });
        }).then(function() {
            resolve();
        })
        .catch(function(error) {
            console.log("Error getting cached document:", error);
            reject();
        });

    });
}

// creates event and returns the id of the event
// this should really return a future so we can handle 
export function addEvent(eventName, description, location) {
    var user = firebase.auth().currentUser;
    console.log("running addevent");
    console.log("location from addEvent is: ", location);

    return new Promise(function (resolve, reject) {
        if (user) {
            const userID = user.uid;
        
            db.collection("events").add({
                name: eventName,
                desccription: description,
                location: location.name,
                lat: location.lat,
                long: location.long,
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

                resolve(docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                reject(null);
            });
        } else {
            console.log("no user signed in");
            reject(null);
        }
    });
}

export async function saveProfileData (firstName, lastName, emailAddress) {
    var user = firebase.auth().currentUser;
    console.log("running addevent");

    if(user) {
        const userID = user.uid;
        const userRef = db.collection("users").doc(userID);
        const waiting = await userRef.update({
            first: firstName,
            last: lastName,
            email: emailAddress
        })
        console.log("update complete")

    } else {
        console.log("no user :(")
    }
}

export function getProfileData() {
    var user = firebase.auth().currentUser;
    console.log("running addevent");

    if (user) {
        const userID = user.uid;
        const userRef = db.collection("users").doc(userID);
        return userRef.get();
    } else {
        console.log("no user signed in");
        const dummyData = {
            first: "",
            last: "",
            email: ""
        }
        return new Promise(function (resolve) {
            resolve(dummyData);
        });
    }
}

// state should be a bool
export async function setAttendeeState(eventID, date, state) {
    const user = firebase.auth().currentUser;

    if(user) {
        const userID = user.uid;
        const eventRef = db.collection("events").doc(eventID);
        const event = await eventRef.get();
        
        if (event.exists) {
            let eventData = event.data()
            let dates = eventData.dates;

            // go through each date
            for (let i in dates) { 
                // if we're at the correct date
                if (dates[i].date.seconds === date.date.seconds) {
                    // go through all the users
                    for (let j in dates[i].avalibility) {
                        // use keys to find the user id number
                        let keys = Object.keys(dates[i].avalibility[j]);
                        console.log("keys[0] is: ", keys[0]);
                        console.log("userID is: ", userID);
                        if (keys[0] === userID) {
                            const userIDKey = keys[0];
                            const objectRef = dates[i].avalibility[j];
                            objectRef[userIDKey] = state;
                            console.log("was there really an update")
                        }
                    }
                }
            }

            eventData.dates = dates;
            const saveData = await eventRef.update(eventData);
            console.log("updated attendee state", saveData);

        } else {
            console.log("no event :(")
        }

    } else {
        console.log("no user :(")
    }
}

// this is a bad hack and i should feel bad
let locationObject = null;
export function setLocationObjectFromLocationJS(location) {
    let newLocationObject = {
        name: location.formatted_address,
        lat: location.geometry.location.lat,
        long: location.geometry.location.lng,
    }
    
    locationObject = newLocationObject;
    console.log("Hello from firebaseInterface.js. The location object is: ", locationObject);
}

export function getLocationObjectFromFirebaseInterfaceJS() {
    return locationObject;
}
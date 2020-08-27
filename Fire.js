import firebase from 'firebase';

class Firebase {
  constructor() {
    this.init();
    this.observeAuth();
  }

  observeAuth = () => firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  on = callback => this.ref.limitToLast(20).on('child_added', snapshot => callback(this.parse(snapshot)));

  parse = snapshot => {

    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user
    };
    
    return message;
  };

  off() {
    this.ref.off();
  }


  init = () => {
      firebase.initializeApp({
        apiKey: "AIzaSyDtHjZD7ONiVe7fZylWb1dSoLs1hgh_fW8",
        authDomain: "chatapp-7ee6b.firebaseapp.com",
        databaseURL: "https://chatapp-7ee6b.firebaseio.com",
        projectId: "chatapp-7ee6b",
        storageBucket: "chatapp-7ee6b.appspot.com",
        messagingSenderId: "51760649703",
        appId: "1:51760649703:web:fe231d1924432812eb9942",
        measurementId: "G-5BPZNFX0ZN"
      });
  };

  send = messages => {
    for( let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      const message = {
        text,
        user,
        timestamp: this.timestamp
      };
      this.append(message);
    }
  }

  append = message => this.ref.push(message);

}

Firebase.shared = new Firebase();
export default Firebase;


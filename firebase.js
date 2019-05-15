import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  databaseURL: "https://gfg-demo.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
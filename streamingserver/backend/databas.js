const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const firebaseConfig = {
  apiKey: "AIzaSyB8lszfCMDL0neL-fts7tQ_oRMol0VUNtY",
  authDomain: "chat-80962.firebaseapp.com",
  databaseURL: "https://chat-80962-default-rtdb.firebaseio.com",
  projectId: "chat-80962",
  storageBucket: "chat-80962.appspot.com",
  messagingSenderId: "591246765561",
  appId: "1:591246765561:web:a521431c50b780af0e2128",

};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports={ db };




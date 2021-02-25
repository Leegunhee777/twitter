import firebase from "firebase/app";
import "firebase/auth"; //회원가입과 관련된 것 파이어베이스 홈페이지에서 Authentication 부분임
import "firebase/firestore"; //데이터베이스 관련된것 파이어베이스 홈페이지에서 Cloud Firesotre 부분임

//노마드강의 1.0 3.0목차 강의참고!!
const firebaseConfig = {
    apiKey: "AIzaSyBYw2SYzn9HyDXU8Kf7y5BSfXNwxWApz-k",
    authDomain: "twitter-4b7cb.firebaseapp.com",
    projectId: "twitter-4b7cb",
    storageBucket: "twitter-4b7cb.appspot.com",
    messagingSenderId: "892502561920",
    appId: "1:892502561920:web:e9c696845a3f11f3cfc265"
  };

  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
  
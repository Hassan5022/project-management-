import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyB_oUGaL7itNZ5GR7wAsnhVb5qM0T2McDE",
	authDomain: "project-management-site-pms.firebaseapp.com",
	projectId: "project-management-site-pms",
	storageBucket: "project-management-site-pms.appspot.com",
	messagingSenderId: "465473705613",
	appId: "1:465473705613:web:e63584f83c06e54baeb4c4",
};

//  init firebase
initializeApp(firebaseConfig);

//  init firebase
const projectFirestore = getFirestore();

//  init auth
const projectAuth = getAuth();

// init storage
const projectStorage = getStorage();

const timestamp = serverTimestamp();

export { projectFirestore, projectAuth, projectStorage, timestamp };

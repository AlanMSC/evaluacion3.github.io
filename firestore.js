import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBZUxWJv4i0goILaUWkQpzqXIYkNI5XYwQ",
    authDomain: "eva3-7daee.firebaseapp.com",
    projectId: "eva3-7daee",
    storageBucket: "eva3-7daee.appspot.com",
    messagingSenderId: "391636613155",
    appId: "1:391636613155:web:e979f10df4ede04556d996"
  };
  
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const save = (libro) => {
    addDoc(collection(db, 'libros'), libro)
}

export const getData = (data) => {
    onSnapshot(collection(db, 'libros'), data)
}

export const remove = (id) => {
    deleteDoc(doc(db, 'libros', id))
}

export const getDocumento = (id) => getDoc(doc(db, 'libros', id))
export const update = (id,libr) =>{
    updateDoc(doc(db,'libros',id),libr)
}





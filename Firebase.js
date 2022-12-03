// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth"
import {useEffect, useState} from "react";

const firebaseConfig = {
    apiKey: "AIzaSyC9AJEVD1mgwYCOTg2H59Spi7fLykriKc0",
    authDomain: "hackaton-370515.firebaseapp.com",
    projectId: "hackaton-370515",
    storageBucket: "hackaton-370515.appspot.com",
    messagingSenderId: "172228369863",
    appId: "1:172228369863:web:ce0b93dc3402abcb520de2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    signInWithPopup(auth, provider).then(result => {
        console.log(result)
    }).catch(error => {
        alert(error)
    })
}

export const handleLogout = async () => {
    await signOut(auth)
}

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub;
    }, [])

    return currentUser;
}
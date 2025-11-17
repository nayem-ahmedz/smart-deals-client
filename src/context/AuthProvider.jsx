import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export default function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // email + password register
    function createUser(email, password){
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function signInUser(email, password){
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // continue with Google
    const googleProvider = new GoogleAuthProvider();
    function continueWithGoogle(){
        return signInWithPopup(auth, googleProvider);
    }
    // update user profile
    function updateUserProfile(updatedData){
        setLoading(true);
        updateProfile(auth.currentUser, updatedData)
            .then(() => setLoading(false))
            .catch(error => console.log(error));
    }
    // logout user
    function logoutUser(){
        setLoading(true);
        return signOut(auth);
    }
    // obserber
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setCurrentUser(user);
                setLoading(false);
                const loggedInUser = {email: user.email};
                fetch('http://localhost:3000/get-token', {
                    method: 'post',
                    headers: {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify(loggedInUser)
                })
                  .then(res => res.json())
                  .then(data => {
                    console.log(data);
                    localStorage.setItem('token', data.token);
                  });
            } else{
                localStorage.removeItem('token');
                setCurrentUser(null);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);
    const authInfo = {
        currentUser,
        createUser,
        signInUser,
        continueWithGoogle,
        updateUserProfile,
        logoutUser,
        loading,
        setLoading
    }
    return(
        <AuthContext value={authInfo}>
            { children }
        </AuthContext>
    );
}
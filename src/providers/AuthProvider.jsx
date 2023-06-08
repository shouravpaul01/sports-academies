import { createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext=createContext(null)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user,setUser]=useState()

    const createAccount=(email,password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const googleSignIn=()=>{
        return signInWithPopup(auth, googleProvider)
    }
    const logOut=()=>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        });
        return ()=>{
            return unsubscribe()
        }
    },[])
    
   const users={
        user,
        googleSignIn,
        logOut,
        createAccount
    }
    return (
        <AuthContext.Provider value={users}>
            {children} 
        </AuthContext.Provider>
    );
};

export default AuthProvider;
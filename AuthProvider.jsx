import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { auth } from "./firebase.init";

// export let AuthContext = createContext();
const provider = new GoogleAuthProvider();

 const AuthProvider = ({children}) => {

    let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  // console.log(user);
  let createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  let logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  let googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  let updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  let logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    let unSubscribe = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser);

if (currentUser) {
      const res = await axios.post("https://real-estate-platform-server-six.vercel.app/jwt", {
        email: currentUser.email,
      });
      const token = res.data.token;

      // Store token
      localStorage.setItem("access-token", token);
    } else {
      localStorage.removeItem("access-token");
    }


        setLoading(false);
        // console.log(currentUser?.accessToken);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  let All = {
    user,
    setUser,
    createUser,
    logOut,
    logIn,
    setLoading,
    loading,
    googleLogin,
    updateUser,
  };

  return <AuthContext value={All}>{children}</AuthContext>;
};

export default AuthProvider;
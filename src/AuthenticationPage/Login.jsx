import React, { useState } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { NavLink, useNavigate } from 'react-router';
const Login = () => {

  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();

  const [logemail, setLogEmail] = useState("")
  const [logpassword, setLogPassword] = useState("")
const [logemailerror, setLogemailerror]= useState("")
const [logpasswordrror, setLogpassworderror] = useState("");

  const takeLoginvalue = (e) => {
    const { id, value } = e.target;
    if (id == "email") {
      setLogEmail(value)
    }
    else if (id == "password") {
      setLogPassword(value)
    }
  }


  const handleLogin = () => {
    if (!logemail) {
      setLogpassworderror("Please give your mail")
    }
    else if (!logpassword) {
      setLogemailerror("Please give your passwor")
    }
    else {
      setLogemailerror("")
      setLogpassworderror("")

      signInWithEmailAndPassword(auth, logemail, logpassword).then((userinfo) => {
        navigate("/")
      })
    }
  }


  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userinfo) => {
        const { user } = userinfo;
        let userRef = push(ref(db, "users/"));
        set(userRef, {
          username: user.displayName || fullname,
          email: user.email || email,
          profile_picture: user.photoURL,
          userUid: user.uid,
        });
      alert("google log i done")
        navigate("/");
        console.log(userinfo);
      })
      .catch((err) => {
        console.log(`error from google log in ${err}`);
      });
  }
  return (
    <div >
     login </div>
  );
}

export default Login
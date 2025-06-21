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
    try { if (!logemail) {
      setLogpassworderror("Please give your mail");
    } else if (!logpassword) {
      setLogemailerror("Please give your passwor");
    } else {
      setLogemailerror("");
      setLogpassworderror("");

      signInWithEmailAndPassword(auth, logemail, logpassword).then(
        (userinfo) => {
          navigate("/");
        }
      );
    }
      
    } catch (error) {
      alert("Here Have Some error, Please Try again!")
    }
   
  }


  
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-2">
      <h3 className='text-2xl font-medium'>You Can SignUp Only By E-mail</h3>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="email">Enter Your Email *</label>
        <input
          id="email"
          type="email"
          placeholder="Enter Your Email"
          className="border px-2 py-1 rounded  "
          onChange={(e) => takeLoginvalue(e)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Enter Your Password *</label>
        <input
          id="password"
          type="password"
          className="border px-2 py-1 rounded "
          placeholder="Enter Your Password"
          onChange={(e) => takeLoginvalue(e)}
        />
      </div>
      <div className="flex justify-center items-center gap-3">
        <button
          className="px-3 py-1 bg-blue-600 rounded text-white font-medium mt-2 cursor-pointer"
          onClick={handleLogin}
        >
          Login
        </button>
       
      </div>
      <h3 className="text-sm mt-3 ">
        Don't Have An Account?{" "}
        <NavLink to={"/signup"} className={"text-red-500 "}>
          Click
        </NavLink>
      </h3>
    </div>
  );
}

export default Login
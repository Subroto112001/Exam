import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { NavLink, useNavigate } from "react-router";
const Signup = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();
  const [fullname, setFullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passworError, setPassworError] = useState("");

  const takevalue = (event) => {
    console.log(event.target);
    const { id, value } = event.target;
    if (id === "Fullname") {
      setFullname(value);
    } else if (id === "email") {
      setemail(value);
    } else {
      setPassword(value);
    }
  };
  const handlesignup = async () => {
    if (!fullname) {
      setFullnameError("Full Name missing here");
      return;
    }
    if (!email) {
      setEmailError("Email is missing here");
      return;
    }
    if (!password) {
      setPassworError("Password is missing here");
      return;
    }

    setFullnameError("");
    setEmailError("");
    setPassworError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fullname,
        photoURL: "",
      });

      const userRef = push(ref(db, "users/"));
      await set(userRef, {
        username: fullname,
        email: email,
        profile_picture: "",
        userUid: user.uid,
      });

      await sendEmailVerification(user)
        .then(() => {
          alert(
            "Verification email has been sent to your inbox."
          );
          navigate("/login"); 
        })
        .catch((error) => {
          console.error("Error sending verification email:", error);
          alert("Failed to send verification email: " + error.message);
        });
    } catch (error) {
      console.error("error from firebse:", error.code, error.message);
    } finally {
      setFullname("");
      setemail("");
      setPassword("");
    }
  };

  return (
    <div>
      signup
      </div>
  );
};

export default Signup;

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
        blog: ""
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
    <div className="flex flex-col h-screen justify-center items-center gap-2">
      <div className="flex flex-col gap-2 ">
        <label htmlFor="Fullname">Enter Your Full Name *</label>
        <input
          id="Fullname"
          type="text"
          placeholder="Enter Your Name"
          className="border px-2 py-1 rounded"
          onChange={(e) => takevalue(e)}
        />
        {fullnameError && (
          <p className="text-red-500 text-sm">{fullnameError}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Enter Your Email *</label>
        <input
          id="email"
          type="email"
          placeholder="Enter Your Email"
          className="border px-2 py-1 rounded  "
          onChange={(e) => takevalue(e)}
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="pass">Enter Your Password *</label>
        <input
          id="password"
          type="password"
          className="border px-2 py-1 rounded "
          placeholder="Enter Your Password"
          onChange={(e) => takevalue(e)}
        />

        {passworError && <p className="text-red-500 text-sm">{passworError}</p>}
      </div>
      <button
        className="px-3 py-1 bg-blue-600 rounded text-white font-medium mt-2 cursor-pointer"
        onClick={handlesignup}
      >
        Signup
      </button>
      <h3 className="text-sm mt-3">
        Already Have An Account?{" "}
        <NavLink to={"/login"} className={"text-red-500 "}>
          Here
        </NavLink>{" "}
      </h3>
    </div>
  );
};

export default Signup;

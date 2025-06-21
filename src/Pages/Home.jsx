import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { ThemeContext } from "../Context/ThemeContext"; // Update the path!

import { getDatabase, onValue, ref, update } from "firebase/database";

const Home = () => {
  const auth = getAuth();
  const db = getDatabase()
  const navigate = useNavigate();
  const [isVerfied, setisVerfied] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);
const [bloggerdata, setbloggerdata]= useState({})
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setisVerfied(user.emailVerified);
      } else {
        alert("please verify your email");
        navigate("/login");
      }
    });
  }, []);

  const handleimageUpload = () => {
    cloudinary.openUploadWidget(
      {
        cloudName: "df8qz4g9h",
        uploadPreset: "ChatAppFile",
        sources: [
          "local",
          "url",
          "camera",
          "dropbox",
          "unsplash",
          "google_drive",
          "shutterstock",
          "image_search",
          "gettyimages",
          "istock",
        ],
        googleApiKey: "AIzaSyAykP0egZO9VbeFAJ8hBJE5td7ho2gcOXY",
        searchBySites: ["all", "cloudinary.com"],
        searchByRights: true,
      },
      (err, result) => {
        if (err) {
          console.error("Failed to upload image ", err);
          return;
        }
        console.log(result.info.secure_url);

        update(ref(db, `users/${bloggerdata.userKey}`), {
          profile_picture: result?.info?.secure_url,
        });
      }
    );
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://upload-widget.cloudinary.com/latest/global/all.js`;
    script.async = true;
    document.body.appendChild(script);
  }, []);



/**
 * 
 * todo : here we will feth user data
 * */
  
  
useEffect(() => {
  const fetchdata = () => {
    const UseRef = ref(db, "users/");
    onValue(UseRef, (snapshot) => {
      let bloggerBlankinfo = null;

      snapshot.forEach((item) => {
        if (item.val().userUid === auth.currentUser.uid) {
          bloggerBlankinfo = { ...item.val(), userKey: item.key };
        }
      });
      setbloggerdata(bloggerBlankinfo);
    });
  };
  fetchdata();
}, []);
 console.log(bloggerdata);
 


  return (
    <div className="container bg-BGWhite">
      <div className="flex justify-between items-center bg-BGWhite">
        <div className="author flex flex-col items-center ">
          <div className="flex flex-col items-center">
            <div className="w-[200px] h-[200px]  border-2 border-gray-400 rounded-full ">
              <picture>
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={bloggerdata ? bloggerdata.profile_picture : ""}
                  alt={bloggerdata.profile_picture}
                />
              </picture>
            </div>
            <h3 className="text-xl mt-2 font-bold">{bloggerdata.username}</h3>
          </div>
          <button
            className="py-1 px-2 mt-2 bg-blue-400 rounded text-white cursor-pointer "
            onClick={handleimageUpload}
          >
            Upload Image
          </button>
        </div>
        <div>
          <h3 className="text-3xl">
            {" "}
            To Post Your Blog , Go to Your{" "}
            <NavLink to={"/blog"} className={" text-red-500"}>
              Blog
            </NavLink>
          </h3>
        </div>
        {/* dark mode  night mode button */}
        <div>
          <button
            className="bg-gray-600 px-3 py-2 rounded cursor-pointer text-white"
            onClick={toggleTheme}
          >
            {theme === "light" ? "dark" : "light"} mode
          </button>
        </div>
        {/* dark mode  night mode button */}
      </div>

      <div>
        <h3 className=" text-center text-3xl text-bold">Your Timeline</h3>
      </div>
    </div>
  );
};

export default Home;

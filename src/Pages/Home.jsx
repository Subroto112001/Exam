import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../Context/ThemeContext"; // Update the path!

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isVerfied, setisVerfied] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);

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

        update(ref(db, `users/${userData.userKey}`), {
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

  return (
    <div >
      Home
    </div>
  );
};

export default Home;

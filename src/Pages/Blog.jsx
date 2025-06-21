import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Context/ThemeContext';
import { NavLink } from 'react-router';
import moment from 'moment';

const Blog = () => {
  const [bloggerdata, setbloggerdata] = useState({});
  const [create, setcreate] = useState(false);
  const [blogdata, setBlogdata] = useState({});
  const auth = getAuth();
  const db = getDatabase();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [blogList, setBlogList] = useState([]);
  const [imageholder, setImageHolder] = useState("")
  /**
   * todo :  userdata fetch
   *
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
  const handleUploadblog = (e) => {
    const { value } = e.target;
    setBlogdata(value);
  };
  const uploadblog = () => {
    try {
      set(push(ref(db, "Blog/")), {
        BlogPost: blogdata,
        Author: auth.currentUser.displayName,
        userUid: auth.currentUser.uid,
        createaDAte: moment().format("MM DD YYYY, h:mm:ss a"),
        blogProfile: bloggerdata.profile_picture,
        blogImage: imageholder,
      });
      setBlogdata("");
    } catch (error) {
      console.log(error);
    }
  };


  /**
   * todo : upload image
   * 
   * */
  


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
          setImageHolder(result?.info?.secure_url);
          // update(ref(db, `Blog/${blogList.userKey}`), {
          //   profile_picture: result?.info?.secure_url,
          // });
        }
      );
    };
  console.log(imageholder);
  
    useEffect(() => {
      const script = document.createElement("script");
      script.src = `https://upload-widget.cloudinary.com/latest/global/all.js`;
      script.async = true;
      document.body.appendChild(script);
    }, []);
  

/**
 * todo : blog will fetch here
 * 
 * */
useEffect(() => {
  const fetchdata = () => {
    const UseRef = ref(db, "Blog/");
    onValue(UseRef, (snapshot) => {
      let blogs = [];
      snapshot.forEach((item) => {
        blogs.push({ ...item.val(), blogKey: item.key });
      });
      setBlogList(blogs);
    });
  };
  console.log(blogdata);
  fetchdata();
}, []);





const handleDeleteBlog = (blogKey) => {
  const dbref = ref(db, `Blog/${blogKey}`);
  remove(dbref);
};

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
        </div>

        {/* dark mode  night mode button */}

        {/* dark mode  night mode button */}
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
        <div className=" w-[300px]  p-4 border-2 border-blue-400">
          {create ? (
            <div className="flex flex-col items-center">
              <input
                type="text"
                placeholder="Write Here Your Blog"
                className="border w-full h-full p-3 text-wrap"
                onChange={(e) => handleUploadblog(e)}
              />
              <button
                onClick={handleimageUpload}
                className="bg-red-500 px-3 py-1 rounded mt-2"
              >
                Image
              </button>
              <div>
                <button
                  onClick={uploadblog}
                  className="bg-blue-400 py-1 mt-2 px-3 rounded text-white"
                >
                  Upload
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h3 className="  text-3xl text-bold">Create Your Blog</h3>
              <button
                className="py-1 px-3 rounded bg-blue-500 text-white mt-3"
                onClick={() => setcreate(!create)}
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
      {/* blog container */}
      <div className="mt-[50px] flex gap-4">
        <div>
          {blogList.map((blog) => (
            <div key={blog.blogKey} className="w-[400px] border-2 rounded p-2">
              <div className="flex gap-2">
                <div className="w-[100px] h-[100px] ">
                  <picture>
                    <img
                      src={blog.blogProfile}
                      alt=""
                      className="w-full h-full rounded-full"
                    />
                  </picture>
                </div>{" "}
                <p>{blog.BlogPost}</p>
              </div>
              <p className="text-sm text-gray-500">By: {blog.Author}</p>
              <p className="text-xs text-gray-400">{blog.createaDAte}</p>
              <button
                className="bg-blue-400 px-3 py-1 rounded cursor-pointer mt-2"
                onClick={() => handleDeleteBlog(blog.blogKey)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      ;{/* blog container */}
    </div>
  );
}

export default Blog
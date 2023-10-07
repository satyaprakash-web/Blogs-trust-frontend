import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./singlepost.css";
import UserContext from "../../context/UserContext";
import { motion } from "framer-motion";

function Singlepost() {
  //1 - get id from /post/:postId and render post with that id
  let location = useLocation();
  location = location.pathname;
  const postId = location.split("/")[2];
  // console.log(postId);

  const [singlePost, setSinglePost] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescripion] = useState("");

  useEffect(() => {
    const fetchSinglePost = async () => {
      setProgress(0);
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/posts/${postId}`
      );
      // console.log(res);
      setProgress(30);
      setSinglePost(res.data);
      setTitle(res.data.title);
      console.log(res.data);
      setDescripion(res.data.desc);
      setProgress(100);
    };

    fetchSinglePost();
    // eslint-disable-next-line
  }, [postId]);

  // to show stored image in api folder
  // make Public folder
  const PF = `${process.env.REACT_APP_SERVER}/images/`;

  //2 - delete post if this post belongs to current user
  const context = useContext(UserContext);
  const { user, setProgress, mode } = context;
  const [editVisible, setEditVisible] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/posts/delete/${postId}`,
        {
          data: { username: user.username },
        }
      );
      // go to homepage after deleting
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleEditView = () => {
    setEditVisible((prev) => !prev);
  };
  // 3 - edit post if this post belongs to current user

  const handlePostUpdate = () => {
    axios.patch(`${process.env.REACT_APP_SERVER}/api/posts/update/${postId}`, {
      data: { username: user.username, title: title, desc: description
       },
    }).then(res=>{
      console.log(res);
      window.location.reload();
    }).catch(err=>{
      console.log(err);
    })
  };

  return (
    <motion.div
      whileInView={{ opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      className={`singlepost container-fluid theme-${mode}`}
    >
      <div className="singlepostWrapper">
        <img
          src={
            singlePost.photo
              ? PF + singlePost.photo
              : "https://c4.wallpaperflare.com/wallpaper/405/400/980/winter-snow-sun-light-forest-trees-sunset-wallpaper-preview.jpg"
          }
          alt="img"
          className="singlepostImg"
        />

        <h1 className="singlepostTitle">
          {singlePost.title}
          {/* show delete and edit post icon if this post belongs to current user */}
          {user.username === singlePost.username && (
            <div className="singlepostEdit">
              <i
                className="singlepostIcon fa-regular fa-pen-to-square"
                onClick={toggleEditView}
              ></i>
              <i
                className="singlepostIcon fa-regular fa-trash-can"
                onClick={handleDelete}
              ></i>
            </div>
          )}
        </h1>

        <div className="singlepostInfo">
          <span className="singlepostAuthor">
            Author:
            <b>
              {/* user specific posts ?use=john */}
              <Link className="link" to={`/?user=${singlePost.username}`}>
                {singlePost.username}
              </Link>
            </b>
          </span>
          <span className="singlepostDate">
            {new Date(singlePost.createdAt).toDateString()}
          </span>
        </div>

        {editVisible && (
          <div class="editContainer">
            <div>
              <input type="text" placeholder="Title" value={title} onChange={event=> setTitle(event.target.value)}/>
            </div>
            <div>
              <textarea
                placeholder="Description"
                rows={10}
                value={description}
                onChange={event=> setDescripion(event.target.value)}
              ></textarea>
            </div>
            <div>
              <button onClick={handlePostUpdate}>Update</button>
            </div>
          </div>
        )}

        {!editVisible && <p className="singlepostDesc">{singlePost.desc}</p>}
      </div>
    </motion.div>
  );
}

export default Singlepost;

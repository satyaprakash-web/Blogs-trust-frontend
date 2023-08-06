// home page 
// 1st containes header 
// then posts(9 fraction) and sidebar (3 fraction) -- showing all posts of all users
import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Posts from '../../components/posts/Posts';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';

function Home() {

  const [posts, setPosts] = useState([]);

  // 1- fetch all posts

  // 2- to fetch user specific query /api/posts?user=john&cat=music , we get in search of location == ?user=john&cat=music
  const location = useLocation();
  console.log(location.search);
  const search = location.search;


  useEffect(() => {
    const fetchPosts = async () => {
      setProgress(10);
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/posts`+search);
      // console.log(res);
      setProgress(50);
      setPosts(res.data);
      setProgress(100);
    }

    fetchPosts();
    //eslint-disable-next-line
  }, [search]);

  // loading bar
  const context = useContext(UserContext);
  const {setProgress} = context;



  return (
    <>
      <Header />
      <div className='home'>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  )
}

export default Home;

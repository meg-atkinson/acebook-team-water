import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import Navbar from "../../components/navbar.jsx";
import NewPost from "../../components/NewPost.jsx";
import NewsFeed from "../../components/NewsFeed.jsx";


export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
      <Navbar /> {/*Navbar added to view*/}
      <div>
        <NewPost onPostCreated={(post) => setPosts([post, ...posts])} />
        <h2>News Feed</h2>
        <NewsFeed posts={posts} />
      </div>
    </>
  );
}


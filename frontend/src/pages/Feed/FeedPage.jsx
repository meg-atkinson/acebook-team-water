import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../App";
import { getPosts } from "../../services/posts";
import Navbar from "../../components/navbar.jsx";
import NewPost from "../../components/NewPost.jsx";
import NewsFeed from "../../components/NewsFeed.jsx";


export function FeedPage() {
  const { user } = useUser()
  const [posts, setPosts] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  const targetUserID = "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (!token) {
      navigate("/login");
    return;
  }
    if (loggedIn && user?.id) {
      getPosts(token, user.id, targetUserID)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate, refreshTrigger, user]);

  // Function to trigger a refetch from the database
  const handleNewPost = () => {
    // Increment the trigger to cause useEffect to run again
    setRefreshTrigger(prev => prev + 1);
  };

  // function to trigger post rerender upon like - hand down to LikeButton
  const handlePostLikeToggle = (toggledPost) => {
      setPosts(prevPosts => 
          prevPosts.map(post => 
              post._id === toggledPost._id ? toggledPost : post
          )
      );
  };

  return (
    <>
      <Navbar /> {/*Navbar added to view*/}
      <div>
        <NewPost  onPostCreated={handleNewPost}/>
        <h2>News Feed</h2>
        <NewsFeed posts={posts} onPostLikeToggle={handlePostLikeToggle}/>
      </div>
    </>
  );
}


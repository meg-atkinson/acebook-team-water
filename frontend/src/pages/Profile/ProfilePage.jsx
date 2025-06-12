import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../App";
import './ProfilePage.css'
import Navbar from "../../components/navbar";
import { SideProfile } from "../../components/profile/SideColumn";
import { MainColumn } from "../../components/profile/MainColumn";
import { getUser } from "../../services/user";
import { getPosts } from "../../services/posts";


export const ProfilePage = () => {
    // this gets the user who is logged in
    const { user } = useUser()
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);


    const navigate = useNavigate();
    // check the url of the page for the id of that user
    const { id }  = useParams();
    const targetUserID = id;

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            console.log("Navigating to /login due to missing token or error");
            navigate("/login")
            return;
        }  

        const fetchUserProfile = async () => {

            try {
                // get profile to display based on url
                const userData = await getUser(token, id)
                setProfile(userData.user)
                // get the posts to pass down to other components
                const postData = await getPosts(token, id, targetUserID);
                setPosts(postData.posts);
                }
                catch(err){
                console.error(err)
                navigate('/login')
            }
        };


        fetchUserProfile();
    }, [navigate, id, user, refreshTrigger, targetUserID]);

    // Function to trigger a refetch from the database - hand down to NewPost
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

    // loading if no profile returns
    if (!profile) {
        return (
        <>
        <Navbar />
        <p>Loading profile...</p>
        </>
    );
    }
    // otherwise display profile
    return (
        <>
            <Navbar />
            <div className="profileColumnsContainer">

                {profile ? (
                <SideProfile profile={profile}/>
                ) : (
                    <p>Loading user info...</p>
                )}
                <MainColumn 
                    profile={profile} 
                    posts={posts} 
                    onPostCreated={handleNewPost}
                    onPostLikeToggle={handlePostLikeToggle}
                />
            </div>
        </>
    )
}
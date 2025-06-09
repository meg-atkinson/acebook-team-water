import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getPosts } from "../../services/posts";
// import Post from "../../components/Post";   

import './ProfilePage.css'

import Navbar from "../../components/navbar";
import { SideProfile } from "../../components/profile/SideColumn";
import { MainColumn } from "../../components/profile/MainColumn";
import { getUser } from "../../services/user";

export const ProfilePage = () => {
    const {id} = useParams();
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    // const [posts, setPosts] = useState([]);



    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            navigate("/login")
            return;
        }
      

        const fetchUserProfile = async () => {

        try{
        
        if(!id){
            const meRes = await getMe(token)
            setUser(meData)
            navigate(`/profile/${meData._id}`, {replace: true});
            return;
        }

        // if not logged in user, get friends profile based on url

        const userData = await getUser(token, id)
        setUser(userData.user)
        console.log(userData.user)

        }
        catch(err){
        console.error(err)
        navigate('/login')
        }}

        fetchUserProfile();
    }, [navigate, id]);
    

    if (!user) {
        return (
        <>
        <Navbar />
        <p>Loading profile...</p>
        </>
    );
    }

    return (
        <>
            <Navbar />
            <div className="profileColumnsContainer">

                {user ? (
                <SideProfile user={user}/>
                ) : (
                    <p>Loading user info...</p>
                )}
                <MainColumn user={user}/>

                
            </div>
        </>
    )
}
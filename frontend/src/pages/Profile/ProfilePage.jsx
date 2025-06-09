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


    function parseJwt(token) {
        if (!token) return null;

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );

    return JSON.parse(jsonPayload);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        const decoded = parseJwt(token);
        const userID = decoded?.sub;

        if (!userID) {
            console.error("No userID found in token");
        }

        // const fetchUser = async () => {
        //     try {
        //         const response = await fetch(`http://localhost:3000/users/${userID}`, {
        //             method: "GET",
        //             headers: { 
        //                 "Content-Type": "application/json" ,
        //                 "Authorization": `Bearer ${token}`,
        //             },
        //         });
        //         const result = await response.json();
        //         setUser(result.user);
        //     } catch (error) {
        //         console.error("Error fetching user:", error)
        //     }  
        // };
        // fetchUser();

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
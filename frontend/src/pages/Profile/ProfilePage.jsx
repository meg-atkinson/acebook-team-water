import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";

import './ProfilePage.css'

import Navbar from "../../components/navbar";
import { SideProfile } from "../../components/profile/SideColumn";
import { MainColumn } from "../../components/profile/MainColumn";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

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

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${userID}`, {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json" ,
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                setUser(result.user);
            } catch (error) {
                console.error("Error fetching user:", error)
            }  
        };
        fetchUser();

    }, []);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     const loggedIn = token !== null;
    //     if (loggedIn) {
    //     getPosts(token)
    //         .then((data) => {
    //         setPosts(data.posts);
    //         localStorage.setItem("token", data.token);
    //         })
    //         .catch((err) => {
    //         console.error(err);
    //         navigate("/login");
    //         });
    //     }
    // }, [navigate]);

    // // Redirects users to log in if no token exists
    // const token = localStorage.getItem("token");
    // if (!token) {
    //     navigate("/login");
    //     return;
    // } ORIGINAL CODE FOR POSTS, SHOULD BE ABLE TO USE CODE ABOVE WITH A FEW TWEAKS INSTEAD?

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
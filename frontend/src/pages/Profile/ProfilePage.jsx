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

    // Redirects users to log in if no token exists
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    return (
        <>
            <Navbar />
            <div className="profileColumnsContainer">
                <SideProfile />
                <MainColumn />
            </div>
        </>
    )
}
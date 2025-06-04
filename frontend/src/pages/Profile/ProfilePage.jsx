import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";

import Navbar from "../../components/navbar";

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
            <h1>Your profile</h1>
        </>
    )
}
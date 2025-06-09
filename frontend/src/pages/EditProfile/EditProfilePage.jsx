import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import './EditProfilePage.css';

import Navbar from "../../components/navbar";
import { SideProfile } from "../../components/profile/SideColumn";
import { Info } from "../../components/profile/Info";

export const EditProfilePage = () => {
    const { userID: userIDFromURL } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    function parseJwt(token) {
        try {
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
        } catch (e) {
            console.error("Invalid JWT", e);
            return null;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            navigate('/login');
            return;
        }

        const decoded = parseJwt(token);
        console.log("Decoded token:", decoded); // ✅ Log decoded token

        const userID = decoded?.sub;

        if (!userID) {
            console.error("Token is missing 'sub' field");
            navigate('/login');
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/users/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setUser(responseData);
                } else {
                    const errorText = await response.text();
                    console.error("Failed to fetch user data:", errorText); // ✅ Log error text
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) {
        return (
            <>
                <Navbar />
                <p>Profile not available</p>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="profileColumnsContainer">
                <SideProfile user={user} />
                <Info user={user} />
            </div>
        </>
    );
};
import { useState, useEffect } from "react";

import Navbar from "../../components/navbar.jsx";
import MyProfilePanel from "../../components/MyProfilePanel";
import FriendsList from "../../components/friends/FriendsList.jsx";
import "./FriendsPage.css";

const FriendsPage = () => {
    const [user, setUser] = useState(null);
    
    // This function takes the token stored in local storage and extracts userID:
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

    return (
        <>
        <Navbar />
        <div className="friends-page-container">
            <div className="profile-panel">
                <MyProfilePanel user={user}/>
            </div>
            <div className="friends-list-panel">
                <FriendsList user={user}/>
            </div>
            {/* {user ? (
                <p>{JSON.stringify(user)}</p>
            ) : (<p>Loading friends...</p>)} */}
        </div>
        </>
    );
};

export default FriendsPage;
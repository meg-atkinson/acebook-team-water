import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleUser } from "../../services/users.js";
import Navbar from "../../components/navbar.jsx";
import MyProfilePanel from "../../components/MyProfilePanel";
import FriendsList from "../../components/friends/FriendsList.jsx";
import "./FriendsPage.css";

const FriendsPage = () => {
    const [user, setUser] = useState(null);
    
    const {userID} = useParams();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        if (!userID) {
            console.error("No userID found in url");
        }

        const fetchUser = async () => {
            try {
                const result = getSingleUser(userID, token);
                setUser(result.user);
            } catch (error) {
                console.error("Error fetching user:", error)
            }  
        };
        fetchUser();
    }, [userID]);

    return (
        <>
        <Navbar />
        {!user ? (
            <p>Loading profile...</p>
        ) : (
            <>
                <div className="friends-page-container">
                    <div className="profile-panel">
                        <MyProfilePanel user={user}/>
                    </div>
                    <div className="friends-list-panel">
                        <FriendsList user={user}/>
                    </div>
                </div>
            </>
        )}
        </>
    );
};

export default FriendsPage;
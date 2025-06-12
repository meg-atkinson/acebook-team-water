import { useState, useEffect } from "react";
import { useUser } from "../../App";
import { getUser } from "../../services/user";
import Navbar from "../../components/navbar.jsx";
import { SideProfile } from "../../components/profile/SideColumn.jsx";
import FriendsList from "../../components/friends/FriendsList.jsx";
import { FriendRequests } from "../../components/friends/FriendRequests.jsx";
// import { useNavigate } from "react-router-dom";
import "./FriendsPage.css";

const FriendsPage = () => {
    // gets current logged in user 
    const { user } = useUser()
    // set the "profile" i.e. the user whos page we are on
    const [loggedInUser, setLoggedInUser] = useState(null)
    // const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            console.error("No token found");
            return;
        }
        
        const fetchUserById = async () => {
            try {
                const result = await getUser(token, user.id)
                setLoggedInUser(result.user)
            } catch (error) {
                console.error("Error fetching posts:", error)
            }
        };
        fetchUserById();
    }, [user.id]);
    
    return (
        <>
        <Navbar />
        {!loggedInUser ? (
            <p>Loading friends...</p>
        ) : (
            <>
                <div className="friends-page-container">
                        <SideProfile profile={loggedInUser}/>
                    <div className="friends-list-panel">
                        <FriendsList loggedInUser={loggedInUser}/>
                        <FriendRequests loggedInUser={loggedInUser}/>
                    </div>
                </div>
            </>
        )}
        </>
    );
};

export default FriendsPage;
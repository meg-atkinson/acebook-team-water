import { useState, useEffect } from "react";

import Navbar from "../../components/navbar.jsx";
import MyProfilePanel from "../../components/MyProfilePanel";
import FriendsList from "../../components/friends/FriendsList.jsx";
import "./FriendsPage.css";

const FriendsPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/users", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error)
            }  
        };
        fetchData();
    }, []);

    return (
        <>
        <Navbar />
        <div className="friends-page-container">
            <div className="profile-panel">
                <MyProfilePanel />
            </div>
            <div className="friends-list-panel">
                <FriendsList />
            </div>
            {data ? (
                <p>{JSON.stringify(data)}</p>
            ) : (<p>Loading friends...</p>)}
        </div>
        </>
    );
};

export default FriendsPage;
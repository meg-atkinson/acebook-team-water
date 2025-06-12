import "./FriendsList.css";
import { useState, useEffect } from "react";
import { Friend } from "./Friend";

const FriendsList = ({ loggedInUser }) => {
    const [friendsList, setFriendsList] = useState(loggedInUser.friends)

    useEffect(() => {
        setFriendsList(loggedInUser.friends)
    }, [loggedInUser]);

    const handleRemoveFriend = (idToRemove) => {
        setFriendsList(prev => prev.filter(friend => friend._id !== idToRemove))
    }

    

    console.log('friendsList', friendsList)

    return (
        <div>
        <div className="friends-title">
            <h2>My Friends</h2>
        </div>

        <div className="friends-list-container">
            {!friendsList || friendsList.length == 0 ? (
                <p>No friends found.</p>
                ) : (
                friendsList.map((friend) => (
                    <Friend key={friend._id} friend={friend} onRemove={handleRemoveFriend} />
                ))
            )}
        </div>
        </div>
    );
};

export default FriendsList;
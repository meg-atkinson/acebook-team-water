import "./FriendsList.css";
import { Friend } from "./Friend";

const FriendsList = ({ loggedInUser }) => {

    return (
        <div className="friends-list-container">
            <h2>My Friends</h2>
            {!loggedInUser || !loggedInUser.friends || loggedInUser.friends.length == 0 ? (
                <p>No friends found.</p>
                ) : (
                loggedInUser.friends.map((friend) => (
                    <Friend key={friend._id} friend={friend}/>
                ))
            )}
        </div>
    );
};

export default FriendsList;
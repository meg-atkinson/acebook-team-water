import "./FriendsList.css";
import { Friend } from "./Friend";

const FriendsList = ({ loggedInUser }) => {

    return (
        <div>
        <div className="friends-title">
            <h2>My Friends</h2>
        </div>

        <div className="friends-list-container">
            {!loggedInUser || !loggedInUser.friends || loggedInUser.friends.length == 0 ? (
                <p>No friends found.</p>
                ) : (
                loggedInUser.friends.map((friend) => (
                    <Friend key={friend._id} friend={friend}/>
                ))
            )}
        </div>
        </div>
    );
};

export default FriendsList;
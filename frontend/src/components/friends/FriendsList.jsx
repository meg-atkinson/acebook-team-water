import "./FriendsList.css";
import { Friend } from "./Friend";

const FriendsList = ({ user }) => {

    return (
        <div className="friends-list-container">
            <h2>My Friends</h2>
            {!user || !user.friends || user.friends.length == 0 ? (
                <p>No friends found.</p>
                ) : (
                user.friends.map((friend) => (
                    <Friend key={friend._id } id={friend._id} firstName={friend.basicInfo?.firstName || "Unknown"} lastName={friend.basicInfo?.lastName || ""}/>
                ))
            )}
        </div>
    );
};

export default FriendsList;
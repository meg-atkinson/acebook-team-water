import "./FriendsList.css";
import { Friend } from "./Friend";

const FriendsList = () => {
    const friends = [
        { id: 1, name: "Alice Smith" },
        { id: 2, name: "Bob Johnson" },
        { id: 3, name: "Charlie Brown" }
    ];

    return (
        <div className="friends-list-container">
            <h2>My Friends</h2>
            {friends.length === 0 ? (
                <p>No friends found.</p>
                ) : (
                friends.map(friend => (
                    <Friend key={friend.id} name={friend.name}/>
                ))
            )}
        </div>
    );
};

export default FriendsList;
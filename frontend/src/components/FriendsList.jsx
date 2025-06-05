import "./FriendsList.css";

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
            <div key={friend.id} className="friend-card">
            <img
                src={friend.photoUrl || "https://via.placeholder.com/48"}
                alt={`${friend.name} profile`}
                className="friend-photo"
            />
            <div className="friend-name">{friend.name}</div>
                <div className="friend-actions">
                    <button onClick={() => handleUnfriend(friend.id)} className="unfriend-button">
                        Unfriend
                    </button>
                    <button onClick={() => handleProd(friend.id)} className="prod-button">
                        Prod
                    </button>
                </div>
            {/* Optional: Add a status or other info here */}
            </div>
        ))
        )}
    </div>
    );
};

export default FriendsList;
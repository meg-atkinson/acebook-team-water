export const Friend = (friend) => {
    return (
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
    )
}
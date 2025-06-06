export const Friend = ({ id, firstName, lastName }) => {
    return (
        <div key={id} className="friend-card">
            <img
                src="https://via.placeholder.com/48"
                alt={`${firstName} ${lastName}'s profile`}
                className="friend-photo"
            />
            <div className="friend-name">{firstName} {lastName}</div>
                <div className="friend-actions">
                    <button onClick={() => handleUnfriend(id)} className="unfriend-button">
                        Unfriend
                    </button>
                    <button onClick={() => handleProd(id)} className="prod-button">
                        Prod
                    </button>
                </div>
            {/* Optional: Add a status or other info here */}
        </div>
    )
}
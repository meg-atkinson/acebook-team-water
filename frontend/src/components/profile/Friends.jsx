import { Friend } from "../friends/Friend";

export const Friends = ({ showFriends, user }) => {

    

    if (showFriends) {
        return (
            <div className="friends-list-container">
            <h2>My Friends</h2>
            {!user || !user.friends || user.friends.length == 0 ? (
                <p>No friends found.</p>
                ) : (
                user.friends.map((friend) => (
                    <Friend key={friend._id } id={friend._id} firstName={friend.basicInfo?.firstName || "Unknown"} lastName={friend.basicInfo?.lastName || ""} profilePicture={friend.photos?.profilePicture}/>
                ))
            )}
        </div>
        )
    }
}
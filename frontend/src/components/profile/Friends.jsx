
import { Friend } from "../friends/Friend";
import { useState } from "react";
// import { useState } from "react";

export const Friends = ({ showFriends, profile, user, setProfile }) => {
    const [friendsList, setFriendsList] = useState(profile.friends)

    const handleRemoveFriend = (idToRemove) => {
        setFriendsList(prev => prev.filter(friend => friend._id !== idToRemove))
    }

    if (showFriends) {
        return (
            <div className="friendsContainer">
                {friendsList.map((friend) => {
                    return (
                        <div className="friends" key={friend._id}>
                            <Friend friend={friend} user={user} setProfile={setProfile} onRemove={handleRemoveFriend}/>
                        </div>
                    )
                })}
            </div>

        )
    }
}
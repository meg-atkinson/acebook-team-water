
import { Friend } from "../friends/Friend";
import { useState } from "react";

export const Friends = ({ showFriends, profile, user }) => {

    const [userFriends, setUserFriends] = useState(profile.friends);

    if (showFriends) {
        return (
            <div className="friendsContainer">
                {userFriends.map((friend) => {
                    return (
                        <div className="friends" key={friend._id}>
                            <Friend friend={friend} user={user} setUserFriends={setUserFriends}/>
                        </div>
                    )
                })}
            </div>

        )
    }
}
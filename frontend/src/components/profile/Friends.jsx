
import { Friend } from "../friends/Friend";
// import { useState } from "react";

export const Friends = ({ showFriends, profile, user, setProfile }) => {

    if (showFriends) {
        return (
            <div className="friendsContainer">
                {profile.friends.map((friend) => {
                    return (
                        <div className="friends" key={friend._id}>
                            <Friend friend={friend} user={user} setProfile={setProfile}/>
                        </div>
                    )
                })}
            </div>

        )
    }
}
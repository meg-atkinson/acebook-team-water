
import { Friend } from "../friends/Friend";

export const Friends = ({ showFriends, profile, user }) => {

    const userFriends = profile.friends;

    if (showFriends) {
        return (
            <div className="friendsContainer">
                {userFriends.map((friend) => {
                    return (
                        <div className="friends" key={friend._id}>
                            <Friend friend={friend} user={user}/>
                        </div>
                    )
                })}
            </div>

        )
    }
}
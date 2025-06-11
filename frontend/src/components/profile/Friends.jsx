
import { Friend } from "./Friend";

export const Friends = ({ showFriends, profile }) => {

    const userFriends = profile.friends;

    if (showFriends) {
        return (
            <div className="friendsContainer">
                {userFriends.map((friend) => {
                    return (
                        <div className="friends" key={friend._id}>
                            <Friend friend={friend} />
                        </div>
                    )
                })}
            </div>

        )
    }
}
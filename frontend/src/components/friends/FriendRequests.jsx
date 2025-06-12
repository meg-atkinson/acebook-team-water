import { useState, useEffect } from "react"
import { Request } from "./Request"

export const FriendRequests = ({ loggedInUser }) => {
    const [friendRequests, setFriendRequests] = useState([])

    useEffect(() => {
        if (loggedInUser && 'friendRequests' in loggedInUser ) {
        setFriendRequests(loggedInUser.friendRequests)
    }
    console.log("Friend request")
    }, [loggedInUser])


    return (
        <div className="friendRequestsContainer">
            <h1>Your friend requests</h1>
            {friendRequests ? (
                friendRequests.map((sender) => (<Request key={sender} senderId={sender} />)
            )) : (
                <p>You have no friend requests</p>
            )}
        </div>
    )
}
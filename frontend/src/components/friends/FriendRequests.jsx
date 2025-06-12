import { useState, useEffect } from "react"
import { Request } from "./Request"
import { getUser } from "../../services/user"

export const FriendRequests = ({ loggedInUser, setLoggedInUser }) => {
    const [friendRequests, setFriendRequests] = useState(loggedInUser.friendRequests)

    const handleAcceptFriend = async (idOfAccepted) => {
        setFriendRequests(prev => prev.filter(sender => sender !== idOfAccepted))
        const token = localStorage.getItem("token")
        try {
            const updatedUser = await getUser(token, loggedInUser._id);
            setLoggedInUser(updatedUser.user);
        } catch (error) {
            console.error("Error refreshing user after accepting friend requesr", error)
        }
    }

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
                friendRequests.map((sender) => (<Request key={sender} senderId={sender} onAcceptFriend={handleAcceptFriend}/>)
            )) : (
                <p>You have no friend requests</p>
            )}
        </div>
    )
}
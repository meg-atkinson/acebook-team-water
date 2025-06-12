import { useState } from "react"
import { acceptFriendRequest } from "../../services/user"

export const AcceptRequestButton = ({ senderId, onSuccess }) => {
    const [requestAccepted, setRequestAccepted] = useState(false)
    const token = localStorage.getItem("token")

    console.log("senderId", senderId)

    const handleAcceptFriend = async () => {
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
        const result = await acceptFriendRequest(token, senderId)
        
        setRequestAccepted(true)
        onSuccess();
        console.log(result)
        console.log(requestAccepted)
        } catch (error) {
            console.error("Error sending friend request", error)
        }
    }


    return (
        <button onClick={handleAcceptFriend} className="acceptFriendButton">Accept</button>
    )




    
}
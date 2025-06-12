import { useState } from "react"

export const AcceptRequestButton = ({ senderId }) => {
    const [requestAccepted, setRequestAccepted] = useState(false)
    

    const handleAcceptFriend = () => {

        const token = localStorage.getItem("token")
        if (!token) {
            console.error("No token found");
            return;
        }

        const acceptFriendRequest = async () => {
            try {
                const result = await acceptFriendRequest(token, senderId)
                // console.log(result.user)
                setRequestAccepted(prev => !prev)
                console.log(requestAccepted)
            } catch (error) {
                console.error("Error sending friend request", error)
            }

        
        }
        acceptFriendRequest();
    }


    return (
        <button onClick={handleAcceptFriend} className="acceptFriendButton">Accept</button>
    )




    
}
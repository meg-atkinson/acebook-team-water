import { useState } from "react";
import { useUser } from "../../App"
import { sendFriendRequest } from "../../services/user";

export const AddFriendButton = ({ receiver }) => {
    const { user } = useUser();
    const receiverId = receiver._id
    const [requestSent, setRequestSent] = useState(false)



    const handleAddFriend = () => {
    
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        const addFriend = async () => { // this returns an updated version of request receiver
            try {
                const result = await sendFriendRequest(token, receiverId)
                console.log(result.user)
                setRequestSent(prev => !prev)
                console.log(requestSent)

            } catch (error) {
                console.error("Error sending friend request", error)
            }
        }
        addFriend();
    }

    return (
        <button onClick={handleAddFriend} className="addFriendButton" >Send friend request</button>
    )
}
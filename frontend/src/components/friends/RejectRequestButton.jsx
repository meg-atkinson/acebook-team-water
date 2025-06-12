import { rejectFriendRequest } from "../../services/user";

export const RejectRequestButton = ({ senderId }) => {
    const token = localStorage.getItem("token");

    const handleRejectFriend = async () => {
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const result = await rejectFriendRequest(token, senderId)

            console.log(result)
        } catch (error) {
            console.error("Error sending friend request", error)
        }
    }


    
    return (
        <button onClick={handleRejectFriend} className="rejectFriendButton">Reject</button>
    )
}
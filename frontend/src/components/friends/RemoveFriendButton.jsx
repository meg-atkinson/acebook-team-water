import { removeFriend } from "../../services/user";

export const RemoveFriendButton = ({ friend, onSuccess }) => {
    const token = localStorage.getItem("token")
    

    const handleRemoveFriend = async () => {
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const result = await removeFriend(token, friend._id)
            onSuccess();
        } catch (error) {
            console.log("Error", error)
        }
    }

    



    return (
        <button onClick={handleRemoveFriend} className="removeFriendButton">Unfriend</button>
    )
}
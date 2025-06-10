import { Friend } from "../friends/Friend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";




export const Friends = ({ showFriends, user }) => {
    
    
    
    const { id: idFromUrl } = useParams();
    const [loggedInUserData, setLoggedInUserData] = useState(null);

    // Mutual friends (friends of friends who you are not friends with) has different buttons
    // Conditional rendering: if id of that non-friend is in your friend list, render prod and unfriend
    // if id of that non-friend is NOT in your friend list, render add friend

    

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        
        
        const loggedInUserId = decoded.sub;

        console.log(`loggedInUserId: ${loggedInUserId}`)
        console.log(`idFromUrl: ${idFromUrl}`)
        

        if (loggedInUserId !== idFromUrl) { //looking at friends profile

            const fetchUser = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/users/${loggedInUserId}`, {
                        method: "GET",
                        headers: { 
                            "Content-Type": "application/json" ,
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    const result = await response.json();
                    setLoggedInUserData(result.user);
                    console.log(loggedInUserData)
                } catch (error) {
                    console.error("Error fetching user:", error)
                }  
            };

            fetchUser(); 
        }
    }, [idFromUrl, loggedInUserData]);

    if (showFriends) {
        return (
            <div className="friends-list-container">
            <h2>My Friends</h2>
            {!user || !user.friends || user.friends.length == 0 ? (
                <p>No friends found.</p>
                ) : (
                user.friends.map((friend) => (
                    <Friend key={friend._id } loggedInUserData={loggedInUserData} id={friend._id} firstName={friend.basicInfo?.firstName || "Unknown"} lastName={friend.basicInfo?.lastName || ""} profilePicture={friend.photos?.profilePicture}/>
                ))
            )}
        </div>
        )
    }
}
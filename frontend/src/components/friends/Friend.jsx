import { useState, useEffect } from "react";
import { getUser } from "../../services/user";
import { useUser } from "../../App";
import { AddFriendButton } from "./AddFriendButtion";

export const Friend = ({ friend }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const { user } = useUser()
    const friendsArray = loggedInUser?.friends || []; // Create an array of logged in user's friends' objects
    
    const friendsIds = friendsArray.map((myFriend) => myFriend._id) // Array of just their ids
    const isFriend = friendsIds.includes(friend._id); 

    // Get friends friendRequestsArray, if exists/not empty
    // --

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            console.error("No token found");
            return;
        }
        
        
        const fetchUserById = async () => {
            try {
                const result = await getUser(token, user.id)
                setLoggedInUser(result.user)
            } catch (error) {
                console.error("Error fetching posts:", error)
            }
        };
        fetchUserById();
    }, [user.id]);
    
    // console.log('friendsArray:', JSON.stringify(friendsArray, null, 2))
    // // console.log(`Object in friendsArray: ${friendsArray[0]._id}`)
    // console.log("friendsIds:", friendsIds)
    // console.log("id of user", user)
    // console.log("id of friend", friend._id)
    // console.log("isFriend", isFriend)
    // console.log("My own id (aka logged on user)", loggedInUserData._id)


    // const profilePicture = friend.photos.profilePicture
    //     ? `http://localhost:3000/${profilePicture}` // or your actual base URL
    //     : "https://via.placeholder.com/48";

    // console.log("Friend image URL:", profilePicture);

    const handleUnfriend = () => {

    }

    const handleProd = () => {

    }

    const handleFriend = () => {

    }

    return (
        <div key={friend._id} className="friend-card">
            {/* <img
                src={photoUrl}
                alt={`${friend.basicInfo.firstName} ${friend.basicInfo.lastName}'s profile`}
                className="friend-photo"
            /> */}
            <div className="friend-name">{friend.basicInfo.firstName} {friend.basicInfo.lastName}</div>
            
            {user ? ( // If looking at friends' profiles
                friend._id === user.id ? ( // If friend's id is equal to my own id, aka that's me so render no buttons
                    <p>(you)</p>
                ) : ( isFriend ? ( // Friend of friend is user's friend
                    <div className="friend-actions">
                        <button onClick={() => handleUnfriend(friend._id)} className="unfriend-button">
                            Unfriend
                        </button>
                        <button onClick={() => handleProd(friend._id)} className="prod-button">
                            Prod
                        </button>
                    </div>
                ) : ( //Friend of friend is NOT user's friend
                    <div className="friend-actions">
                        <AddFriendButton receiver={friend}/>
                    </div>
                ))
                ) : ( // if not looking at friends' profiles
                    <div className="friend-actions">
                        <button onClick={() => handleUnfriend(friend._id)} className="unfriend-button">
                            Unfriend
                        </button>
                        <button onClick={() => handleProd(friend._id)} className="prod-button">
                            Prod
                        </button>
                    </div>
                )
            }
            {/* Optional: Add a status or other info here */}
            {/* <p>{friendsArray}</p> */}
        </div>
    )
}




// Within friends what's being passed to friends is the user whose profile you are looking at wether its yourself or another user.
// it's checking wether the logged in users id is equal to the url to check if its your own profile or another user
// the only user information passed to that page is related to the user who's profile it is. So we aren't getting logged in users info
// to compare friends. It mapping friend component for each friend that the profile owner has. 

// want to render an add friend if you aren't friends. At the moment is shows add friend on people you are friends with. 
import { useState, useEffect } from "react";

export const Friend = ({ id, firstName, lastName, profilePicture, loggedInUserData }) => {
    const [friendsArray, setFriendsArray] = useState([]);

    useEffect(() => {
        if (loggedInUserData) {
            setFriendsArray(loggedInUserData.friends)
        }
    }, [loggedInUserData])
    
    console.log(`loggedInData: ${loggedInUserData}`)
    console.log(`friendsArray: ${friendsArray}`)
    console.log(`Object in friendsArray: ${friendsArray[0]}`)
    const isFriend = friendsArray.includes(id);


    const photoUrl = profilePicture
        ? `http://localhost:3000/${profilePicture}` // or your actual base URL
        : "https://via.placeholder.com/48";

    console.log("Friend image URL:", photoUrl);

    const handleUnfriend = () => {

    }

    const handleProd = () => {

    }

    const handleFriend = () => {

    }

    return (
        <div key={id} className="friend-card">
            <img
                src={photoUrl}
                alt={`${firstName} ${lastName}'s profile`}
                className="friend-photo"
            />
            <div className="friend-name">{firstName} {lastName}</div>
            
            {loggedInUserData ? ( // If looking at friends' profiles
                isFriend ? ( // Friend of friend is user's friend
                    <div className="friend-actions friend-buttons">
                        <button onClick={() => handleUnfriend(id)} className="unfriend-button">
                            Unfriend
                        </button>
                        <button onClick={() => handleProd(id)} className="prod-button">
                            Prod
                        </button>
                    </div>
                ) : ( //Friend of friend is NOT user's friend
                    <div className="friend-actions non-friend-button">
                        <button onClick={() => handleFriend(id)} className="addFriendButton">
                            Add as friend
                        </button>
                    </div>
                )
            ) : ( // if not looking at friends' profiles
                <div className="friend-actions non-friend">
                    <button onClick={() => handleUnfriend(id)} className="unfriend-button">
                        Unfriend
                    </button>
                    <button onClick={() => handleProd(id)} className="prod-button">
                        Prod
                    </button>
                </div>
            )}
            {/* Optional: Add a status or other info here */}
        </div>
    )
}
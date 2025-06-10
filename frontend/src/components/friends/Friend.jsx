// import { useState, useEffect } from "react";

export const Friend = ({ id, firstName, lastName, profilePicture, loggedInUserData }) => {

    const loggedUserFriends = loggedInUserData
    const friendsArray = loggedInUserData?.friends.id || [];
    const isFriend = friendsArray.includes(id);
    
    console.log(`loggedInData: ${loggedUserFriends}`)
    console.log(`friendsArray: ${friendsArray}`)
    console.log(`Object in friendsArray: ${friendsArray[0]}`)


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




// Within friends what's being passed to friends is the user whose profile you are looking at wether its yourself or another user.
// it's checking wether the logged in users id is equal to the url to check if its your own profile or another user
// the only user information passed to that page is related to the user who's profile it is. So we aren't getting logged in users info
// to compare friends. It mapping friend component for each friend that the profile owner has. 

// want to render an add friend if you aren't friends. At the moment is shows add friend on people you are friends with. 
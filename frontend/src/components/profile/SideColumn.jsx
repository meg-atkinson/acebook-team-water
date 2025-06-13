import { useNavigate } from "react-router-dom"
import { useUser } from "../../App"
import { ProdButton } from '../prods/ProdButton';
import { AddFriendButton } from "../friends/AddFriendButtion";

export const SideProfile = ({ profile, hasProdded }) => {
    const navigate = useNavigate()
    // this gets the user who is logged in
    const { user } = useUser()
    // get the actual profile we are on from the profile prop
    const userID = profile._id
    // boolean for conditional rendering 
    const pageBelongsToUser = user && (user.id === userID || user._id === userID);
    // State to track if user is already a friend
    const isExistingFriend = 
        Array.isArray(user?.friends) && user.friends.some(friendID => friendID?.toString() === profile._id?.toString());


    // convert birthday
    const convertBirthday = () => {
        const birthday = new Date(profile.basicInfo.birthday);
        return birthday.toLocaleDateString('en-GB');
    };

    const handleEditProfile = () => {
        navigate(`/editprofile/${userID}`)
    };

    // determine if AddFriendButton should show
    const shouldShowAddButton = !pageBelongsToUser && !isExistingFriend;

    // if the profile isn't loaded yet, show a loading message
    if (!profile || !profile.basicInfo) {
        return <p>Loading profile...</p>;
    };

    return (
        <div className="sideProfile">
            <img src={profile?.photos?.profilePictureUrl} alt="Profile" />
            <h2>{profile.basicInfo.firstName} {profile.basicInfo.lastName}</h2>

            {pageBelongsToUser ? (
                <button onClick={handleEditProfile}>Edit profile</button>
            ) : (
                !hasProdded && <ProdButton toUserId={profile._id} />
            )}

            <p>{profile.basicInfo.pronouns}</p>
            <p>{convertBirthday()}</p>
            <p>{profile.basicInfo.homeTown}</p>
            <p>Friends: {profile.friends.length}</p>

            {shouldShowAddButton && (
                <AddFriendButton receiver={profile} />
            )}
        </div>
    );
}

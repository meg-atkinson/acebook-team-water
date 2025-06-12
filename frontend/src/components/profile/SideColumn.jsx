import { useNavigate } from "react-router-dom"
import { useUser } from "../../App"
import { ProdButton } from '../prods/ProdButton';

export const SideProfile = ({ profile, currentUser }) => {
    const navigate = useNavigate()
    // this gets the user who is logged in
    const { user } = useUser()
    // get the actual profile we are on from the profile prop
    const userID = profile._id
    // boolean for conditional rendering 
    const pageBelongsToUser = user && (user.id === userID || user._id === userID);

    // convert birthday
    const convertBirthday = () => {
        const birthday = new Date(profile.basicInfo.birthday);
        return birthday.toLocaleDateString('en-GB');
    }

    const handleEditProfile = () => {
        navigate(`/editprofile/${userID}`)
    }

    if (!profile || !profile.basicInfo) {
        return <p>Loading profile...</p>;
    }

    // const profilePicUrl = `http://localhost:3000/${profile.photos.profilePicture}`
    //     ? `http://localhost:3000/${profile.photos.profilePicture}`
    //     : "https://www.hcihealthcare.ng/wp-content/uploads/2016/10/face-avatar.png"; // fallback image if none

    const profilePicUrl = `http://localhost:3000/${profile.photos.profilePicture}`;

    return (
        <div className="sideProfile">
            <img src={profilePicUrl} />
            <h2>{profile.basicInfo.firstName} {profile.basicInfo.lastName}</h2>
            {/* <p>{profile.status[0]}</p> */}
            {pageBelongsToUser ? (
            <button onClick={handleEditProfile}>Edit profile</button>
            ) : (
            <ProdButton toUserId={profile._id} />
            )}
            <br />
            <p>{profile.basicInfo.pronouns}</p>
            <p>{convertBirthday()}</p>
            <p>{profile.basicInfo.homeTown}</p>
            <p>Friends: {profile.friends.length}</p>
        </div>
    )
}

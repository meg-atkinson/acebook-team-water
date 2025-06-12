import { useNavigate } from "react-router-dom"
import { useUser } from "../../App"

export const SideProfile = ({ profile }) => {
    const navigate = useNavigate()
    // this gets the user who is logged in
    const { user } = useUser()
    // get the actual profile we are on from the profile prop
    const userID = profile._id
    // boolean for conditional rendering 
    const pageBelongsToUser = user && user.id === userID;

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

    return (
        <div className="sideProfile">
            <img src={profile?.photos?.profilePictureUrl} /> 
            <h2>{profile.basicInfo.firstName} {profile.basicInfo.lastName}</h2>
            {/* <p>{profile.status[0]}</p> */}
            {pageBelongsToUser &&
            <button onClick={handleEditProfile}>Edit profile</button>
            }
            <br />
            <p>{profile.basicInfo.pronouns}</p>
            <p>{convertBirthday()}</p>
            <p>{profile.basicInfo.homeTown}</p>
            <p>Friends: {profile.friends.length}</p>
        </div>
    )
}

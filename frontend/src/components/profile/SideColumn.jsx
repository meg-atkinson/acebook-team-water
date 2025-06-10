import { useNavigate } from "react-router-dom";

export const SideProfile = ({ user }) => {

    const convertBirthday = () => {
        const birthday = new Date(user.basicInfo.birthday);
        return birthday.toLocaleDateString('en-GB');
    }

    if (!user || !user.basicInfo) {
        return <p>Loading profile...</p>;
    }

    const navigate = useNavigate();
    const handleEditProfile = () => {
        navigate(`/editprofile/${user.id}`); //switch out with settled user.id identifier
    };

    const profilePicUrl = user.photos.profilePicture
        ? `http://localhost:3000/${user.photos.profilePicture}`
        : "https://www.hcihealthcare.ng/wp-content/uploads/2016/10/face-avatar.png"; // fallback image if none

    return (
        <div className="sideProfile">
            <img src={profilePicUrl} />
            <h2>{user.basicInfo.firstName} {user.basicInfo.lastName}</h2>
            {/* <p>{user.status[0]}</p> */}
            <button onClick={handleEditProfile}>Edit profile</button>
            <br />
            <p>{user.basicInfo.pronouns}</p>
            <p>{convertBirthday()}</p>
            <p>{user.basicInfo.homeTown}</p>
            <p>Friends: {user.friends.length}</p>
        </div>
    )
}

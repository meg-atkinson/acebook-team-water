const MyProfilePanel = ({ user }) => {

    const convertBirthday = () => {
        const birthday = new Date(user.basicInfo.birthday);
        return birthday.toLocaleDateString('en-GB');
    }

    const profilePicUrl = user.photos.profilePicture
        ? `http://localhost:3000/${user.photos.profilePicture}`
        : "https://www.hcihealthcare.ng/wp-content/uploads/2016/10/face-avatar.png"; // fallback image if none

    return (
        <div>
        <img src={profilePicUrl} alt="Profile" style={{ width: "100%", borderRadius: "12px" }} />
            <h2>{user.basicInfo.firstName} {user.basicInfo.lastName}</h2>
            <p>{user.bio}</p>
            <p>{user.basicInfo.pronouns}</p>
            <p>{user.basicInfo.relStatus}</p>
            <p>{convertBirthday()}</p>
            <p>{user.basicInfo.homeTown}</p>
            <p>Friends: {user.friends.length}</p>
        </div>
    );
};

export default MyProfilePanel;
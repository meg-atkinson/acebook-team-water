const MyProfilePanel = () => {

    const user = {
        name: "John Doe",
        photoUrl: "https://www.hcihealthcare.ng/wp-content/uploads/2016/10/face-avatar.png",
        bio: "Just a friendly developer!",
        pronouns: "he/him",
        relStatus: "Single",
        birthday: "31 March",
        homeTown: "London"
    };

    return (
        <div>
        <img src={user.photoUrl} alt="Profile" style={{ width: "100%", borderRadius: "12px" }} />
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
        <p>{user.pronouns}</p>
        <p>{user.relStatus}</p>
        <p>{user.birthday}</p>
        <p>{user.homeTown}</p>
        </div>
    );
};

export default MyProfilePanel;
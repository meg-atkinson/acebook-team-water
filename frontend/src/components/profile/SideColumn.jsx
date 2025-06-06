export const SideProfile = ({ user }) => {

    const convertBirthday = () => {
        const birthday = new Date(user.basicInfo.birthday);
        return birthday.toLocaleDateString('en-GB');
    }

    if (!user || !user.basicInfo) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="sideProfile">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010" />
            <h2>{user.basicInfo.firstName} {user.basicInfo.lastName}</h2>
            {/* <p>{user.status[0]}</p> */}
            <button>Edit profile</button>
            <br />
            <p>{user.basicInfo.pronouns}</p>
            <p>{convertBirthday()}</p>
            <p>{user.basicInfo.homeTown}</p>
            <p>Friends: {user.friends.length}</p>
        </div>
    )
}

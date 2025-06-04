export const SideProfile = () => {


    return (
        <div className="sideProfile">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010" />
            <h2>user.basicInfo.firstName user.basicInfo.lastName</h2>
            <p>user.status[0]?</p>
            <button>Edit profile</button>
            <br />
            <p>Pronouns: user.basicInfo.pronouns</p>
            <p>Birthday: user.basicInfo.birthday</p>
            <p>Hometown: user.basicInfo.home</p>
        </div>
    )
}

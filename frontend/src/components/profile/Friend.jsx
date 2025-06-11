export const Friend = ({ friend }) => {

    return (
        <>
            <div className="friendsInfo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" />
                <div>
                    <p>{friend.basicInfo.firstName} {friend.basicInfo.xlastName}</p>
                </div>
            </div>
            <div className="friendsButtons">
                <button>Unfriend {friend.basicInfo.firstName}</button>
                <button>Prod {friend.basicInfo.firstName}</button>
            </div>
        </>
    )
}
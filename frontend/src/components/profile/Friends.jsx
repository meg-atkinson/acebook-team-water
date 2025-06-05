export const Friends = ({ showFriends }) => {

    const userSchema = 
        {
            email: 'eve@me.com',
            password: 'password',
            friends: [
                {
                    id: 1,
                    firstName: 'Gavin',
                    lastName: 'Shipman'
                },
                {
                    id: 2,
                    firstName: 'Stacey',
                    lastName: 'Shipman'
                },
                {
                    id: 3,
                    firstName: 'Pam',
                    lastName: 'Shipman'
                },
                {
                    id: 4,
                    firstName: 'Michael',
                    lastName: 'Shipman'
                },
                {
                    id: 5,
                    firstName: 'Vanessa',
                    lastName: 'Jenkins'
                }
            ]
        }

    if (showFriends) {
        return (
            <div className="friendsContainer">
                {userSchema.friends.map(friend => {
                    return (
                        <div className="friends" key={friend.id}>
                            <div className="friendsInfo">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" />
                                <div>
                                    <p>{friend.firstName} {friend.lastName}</p>
                                    <p>friend.status</p>
                                </div>
                            </div>
                            <div className="friendsButtons">
                                <button>Unfriend {friend.firstName}</button>
                                <button>Prod {friend.firstName}</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
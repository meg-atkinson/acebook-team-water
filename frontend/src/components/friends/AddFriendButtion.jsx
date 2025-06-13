
export const AddFriendButton = ({onFriendRequestSent}) => {

    return (
        <button onClick={onFriendRequestSent} className="addFriendButton" >Send friend request</button>
    )
}
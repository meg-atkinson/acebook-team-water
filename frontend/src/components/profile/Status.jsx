import { useEffect, useState } from "react"
import { NewStatus } from "./NewStatus"
import { getPostsByType } from "../../services/posts"
import { useUser } from "../../App"


export const Status = ({ profile }) => {
    // this gets the user who is logged in
    const { user } = useUser()

    const [updateStatus, setUpdateStatus] = useState(false)

    const handleClick = () => {
        setUpdateStatus(!updateStatus)
        // console.log(updateStatus)
    }
    
    // -------------------------- getting most recent status -----------------------------
    const [currentStatus, setCurrentStatus] = useState(null);

    const userID = profile._id
    const type = 'status'
    const pageBelongsToUser = user && user.id === userID;

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            console.error("No token found");
            return;
        }

        const fetchPostsById = async () => {
            try {
                const statusPosts = await getPostsByType(token, userID, type);
                setCurrentStatus(statusPosts.posts[0])
            } catch (error) {
                console.error("Error fetching posts:", error)
            }
        };
        fetchPostsById();
    }, [updateStatus, userID]);


    // ------------------------------- creating a new status ------------------------------

    

    const [newStatus, setNewStatus] = useState({
        content: "",
        postType: "status",
        targetUserID: userID

    })

    


    const handleChange = (event) => {
        setNewStatus((prevStatus) => ({
            ...prevStatus,
            postType: "status",
            [event.target.name]: event.target.value
        }));
    }

    

    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        

        try {
            const response = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newStatus)
            })
            setUpdateStatus(prev => !prev);

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage || `Signup fail: ${response.status}`);
            }
        } catch (error) {
            console.error("Error in updating status:", error.message)
        }
    };


    const convertDate = () => {
        const statusDate = new Date(currentStatus.createdAt);
        return statusDate.toLocaleString("en-GB");
    }


    if (!updateStatus) {
        return (
            <>
                <div className="statusUpdate">
                    {pageBelongsToUser &&
                    <button onClick={handleClick}>Update status</button>
                    }
                </div>
                {!currentStatus ? (
                    <p>...</p>
                ) : (
                    <div className="statusContainer">
                        <div className="statusInfo">
                            <p>{profile.basicInfo.firstName} {profile.basicInfo.lastName}</p>
                            <p>{currentStatus.content}</p>
                            <p>{convertDate()}</p>
                        </div>
                        
                        {/* {!currentStatus ? (
                            <p>Loading...</p>
                            ) : (
                            currentStatus.map((post) =>
                                (<p key={post._id}>{post.content} {post.postType}</p>))
                        )} */}
                    </div>
                )}
            </>
        )
    } else {
        return <NewStatus handleClick={handleClick} newStatus={newStatus} handleChange={handleChange} handleSubmit={handleSubmit}/>
    }
}
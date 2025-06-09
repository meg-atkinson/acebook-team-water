import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { NewStatus } from "./NewStatus"

export const Status = ({ user, setUser }) => {

    const [updateStatus, setUpdateStatus] = useState(false)

    const handleClick = () => {
        setUpdateStatus(!updateStatus)
        console.log(updateStatus)
    }

    // ^^

    // Get userID from url
    // const { userID: userIDFromURL } = useParams();

    // ---------- getting userID out of token because userIDFromUrl isn't working ---------------------
    // function parseJwt(token) {
    //     if (!token) return null;

    //     const base64Url = token.split('.')[1];
    //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     const jsonPayload = decodeURIComponent(
    //         atob(base64)
    //         .split('')
    //         .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    //         .join('')
    //     );

    // return JSON.parse(jsonPayload);
    // }


    // -------------------------- getting most recent status -----------------------------
    const [currentStatus, setCurrentStatus] = useState(null);

    const userID = user._id

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            console.error("No token found");
            return;
        }

        // const decoded = parseJwt(token);
        // const userID = decoded?.sub;
        
        


        const fetchPostsById = async () => {
            try {
                const response = await fetch (`http://localhost:3000/posts?userID=${userID}&postType=status`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                console.log(result.posts[0])
                console.log(userID)
                console.log(response)
                setCurrentStatus(result.posts[0])
            } catch (error) {
                console.error("Error fetching posts:", error)
            }
        };
        fetchPostsById();
    }, [updateStatus]);


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
            setUpdateStatus(!updateStatus);

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage || `Signup fail: ${response.status}`);
            }
        } catch (error) {
            console.error("Error in updating status:", error.message)
        }
    };

    // ------------------------ get users basic info get request by id --------------------------------


    // useEffect(() => {
    //     // const token = localStorage.getItem("token");

    //     // if (!token) {
    //     //     console.error("No token found");
    //     //     return;
    //     // }

    //     // const decoded = parseJwt(token);
    //     // const userID = decoded?.sub;

    //     // if (!userID) {
    //     //     console.error("No userID found in token");
    //     // }

    //     const fetchUserData = async () => {
    //         try {
    //             const userData = await
    //             });
    //             const result = await response.json();
    //             setUser(result.user);
    //         } catch (error) {
    //             console.error("Error fetching user:", error)
    //         }  
    //     };
    //     fetchUser();
    // }, []);

// ------------------------------------------------------------------------------------------



    const convertDate = () => {
        const statusDate = new Date(currentStatus.createdAt);
        return statusDate.toLocaleString("en-GB");
    }


    if (!updateStatus) {
        return (
            <>
                <div className="statusUpdate">
                    <button onClick={handleClick}>Update status</button>
                </div>
                {!currentStatus ? (
                    <p>Loading status...</p>
                ) : (
                    <div className="statusContainer">
                        <div className="statusInfo">
                            <p>{user.basicInfo.firstName} {user.basicInfo.lastName}</p>
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
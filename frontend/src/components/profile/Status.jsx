import { useState } from "react"
import { useParams } from 'react-router-dom'
import { NewStatus } from "./NewStatus"

export const Status = () => {
    // Boolean to conditionally render status || new status form
    const [updateStatus, setUpdateStatus] = useState(false)

    const handleClick = () => {
        setUpdateStatus(!updateStatus)
        console.log(updateStatus)
    }

    // ^^

    // Get userID from url
    const { userID: userIDFromURL } = useParams();

    const [newStatus, setNewStatus] = useState({
        userID: userIDFromURL,
        content: "",
        postType: "status",
        targetUserID: userIDFromURL
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

    // const handleChange = (event) => {
    //     setNewStatus(event.target.value)
    //     setUpdateStatus(!updateStatus)
    // }

    if (!updateStatus) {
        return (
            <div className="statusContainer">
                <div className="statusInfo">
                    <p>users.basicInfo.firstName users.basicInfo.lastName s status.status</p>
                    <p>status.time status.date</p>
                </div>
                <div className="statusUpdate">
                    <button onClick={handleClick}>Update status</button>
                </div>
            </div>
        )
    } else {
        return <NewStatus handleClick={handleClick} newStatus={newStatus} handleChange={handleChange} handleSubmit={handleSubmit}/>
    }
}
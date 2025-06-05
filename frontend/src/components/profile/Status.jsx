import { useState } from "react"
import { NewStatus } from "./NewStatus"

export const Status = () => {
    const [updateStatus, setUpdateStatus] = useState(false)
    const [newStatus, setNewStatus] = useState('')

    const handleClick = () => {
        setUpdateStatus(!updateStatus)
        console.log(updateStatus)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://url.com/newstatus", {
            method: "POST",
            body: JSON.stringify({ newStatus: newStatus })
        });
    }

    const handleChange = (event) => {
        setNewStatus(event.target.value)
        setUpdateStatus(!updateStatus)
    }

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
        return <NewStatus handleClick={handleClick} handleChange={handleChange} handleSubmit={handleSubmit}/>
    }
}
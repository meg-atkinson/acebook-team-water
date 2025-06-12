import { useState, useEffect } from "react"
import { getUser } from "../../services/user"
import { AcceptRequestButton } from "./AcceptRequestButton"
import { RejectRequestButton } from "./RejectRequestButton"

export const Request = ({ senderId }) => {
    const [sender, setSender] = useState(null)
    
    // fetch request to get info by id
    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            console.error("No token found");
            return;
        }

        const fetchSenderById = async () => {
            try {
                const result = await getUser(token, senderId)
                setSender(result.user)

            } catch (error) {
                console.error("Error fetching sender data:", error)
            }
        };
        fetchSenderById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // !!! Vscode wants to add senderId to the dependency array, 
        // however as it's passed as a prop and never changes it will break the code
        // removing the array will also cause it to infinitely loop
    


    return (
        <div className="requestContainer" >
            {!sender ? (
                <p>Loading request sender's information</p>
            ) : (
                <>
                    <p>{sender.basicInfo.firstName} {sender.basicInfo.lastName}</p>
                    <AcceptRequestButton senderId={senderId}/>
                    <RejectRequestButton senderId={senderId}/>
                </>
            )}
        </div>
    )
}
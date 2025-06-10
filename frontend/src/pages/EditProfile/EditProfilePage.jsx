import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import './EditProfilePage.css';

import Navbar from "../../components/navbar";
import { EditSideProfile } from "../../components/edit/EditSide";
import { UpdateOtherInfo } from "../../components/edit/updateOtherInfo";
import { getUser } from "../../services/user";

export const EditProfilePage = () => {
    const {id} = useParams();
    const location = useLocation();
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    


    useEffect(() => {
        const token = localStorage.getItem("token");        
        
        if (!token) {
            console.error("No token found");
            navigate("/login")
            return;
        }
      
        const fetchUserProfile = async () => {
            try{
                if(!id){
                    const meRes = await getMe(token)
                    setUser(meData)
                    navigate(`/editprofile/${meData._id}`, {replace: true});
                    return;
            }

        // if not logged in user, get friends profile based on url
                const userData = await getUser(token, id)
                setUser(userData.user)
                console.log(userData.user)
            }

            catch(err){
                console.error("Error in fetchUserProfile:", err)
                navigate('/login')
            }
        }

        fetchUserProfile();
    }, [navigate, id]);
    

    if (!user) {
        return (
        <>
        <Navbar />
        <p>Loading profile...</p>
        <p>Debug: Current ID = "{id}"</p>
        <p>Debug: URL = {window.location.href}</p>
        </>
    );
    }

return (
        <>
            <Navbar />
            <div className="profileColumnsContainer">
                {user ? (
                <EditSideProfile user={user}/>
                ) : (
                    <p>Loading user info...</p>
                )}
                <UpdateOtherInfo user={user} />
            </div>
        </>
    );
};
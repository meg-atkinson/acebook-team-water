import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import './EditProfilePage.css';

import Navbar from "../../components/navbar";
import { SideProfile } from "../../components/profile/SideColumn";
import { Info } from "../../components/profile/Info";
import { getUser } from "../../services/user";

export const EditProfilePage = () => {
    const {id} = useParams();
    const location = useLocation();
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

        // Debug logging
    console.log("=== DEBUG INFO ===");
    console.log("Current URL:", window.location.href);
    console.log("Location pathname:", location.pathname);
    console.log("useParams() result:", useParams());
    console.log("ID from useParams:", id);
    console.log("ID type:", typeof id);
    console.log("==================");

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
                    console.log("No ID found, calling getMe");
                    const meRes = await getMe(token)
                    setUser(meData)
                    navigate(`/editprofile/${meData._id}`, {replace: true});
                    return;
            }

        // if not logged in user, get friends profile based on url
                console.log("About to call getUser with ID:", id);
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
                <SideProfile user={user}/>
                ) : (
                    <p>Loading user info...</p>
                )}
                <Info user={user} />
            </div>
        </>
    );
};
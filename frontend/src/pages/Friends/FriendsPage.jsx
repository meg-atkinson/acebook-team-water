import { useState, useEffect } from "react";
import { useUser } from "../../App";
import { getUser } from "../../services/user";
import Navbar from "../../components/navbar.jsx";
import { SideProfile } from "../../components/profile/SideColumn.jsx";
import FriendsList from "../../components/friends/FriendsList.jsx";
import { useNavigate } from "react-router-dom";
import "./FriendsPage.css";

const FriendsPage = () => {
    // gets current logged in user 
    const { user } = useUser()
    // set the "profile" i.e. the user whos page we are on
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        const fetchUser = async () => {
            try {
                // get profile to display based on url
                const userData = await getUser(token, user.id)
                setProfile(userData.user)
            } catch(err) {
                console.error(err)
                navigate('/login')
            }
        };
        fetchUser();
    }, [navigate, user]);


    console.log(profile)
    return (
        <>
        <Navbar />
        {!user ? (
            <p>Loading profile...</p>
        ) : (
            <>
                <div className="friends-page-container">
                    <div className="profile-panel">
                        {/* not sure same comp can be child of two dif pages */}
                        {/* <SideProfile profile={profile}/> */}
                    </div>
                    <div className="friends-list-panel">
                        <FriendsList profile={profile}/>
                    </div>
                </div>
            </>
        )}
        </>
    );
};

export default FriendsPage;
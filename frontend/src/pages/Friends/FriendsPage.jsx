import Navbar from "../../components/navbar.jsx";
import MyProfilePanel from "../../components/MyProfilePanel";
import FriendsList from "../../components/FriendsList";
import "./FriendsPage.css";

const FriendsPage = () => {
    return (
        <>
        <Navbar />
        <div className="friends-page-container">
            <div className="profile-panel">
            <MyProfilePanel />
            </div>
            <div className="friends-list-panel">
            <FriendsList />
            </div>
        </div>
        </>
    );
};

export default FriendsPage;
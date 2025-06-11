import "./SearchResult.css";
import {useNavigate} from "react-router-dom"

export const SearchResult = ({ result, setResults, setInput}) => {
const navigate = useNavigate()

const handleClick = () => {
    navigate(`/profile/${result._id}`)
    setResults([])
    setInput("")

}

    return (
        <div className="result-info" onClick={handleClick} style={{cursor: "pointer"}} >   
        <img
            src={
                result?.photos?.profilePicture
                ? `http://localhost:3000/${result.photos.profilePicture}`
                : '/default-profile.png'
            }
            alt="Profile"
            className="profile-pic"
            />
            <div className="author-name">
                {result?.basicInfo?.firstName} {result?.basicInfo?.lastName}
            </div>
        </div>
    );
};
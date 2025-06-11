import "./SearchResult.css";

export const SearchResult = ({ result }) => {
    return (
        <div className="result-info">
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
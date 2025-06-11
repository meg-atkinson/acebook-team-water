export const Info = ({ showInfo, profile }) => {
    if (!showInfo) {
        return null;
    }
    if (!profile || !profile.otherInfo) {
        return <p>Loading info...</p>;
    }
        return (
            <div className="infoContainer">
                <h2>Your Personal Info:</h2>
                <p>Personal interests: {profile.otherInfo.interests}</p>
                <p>Favourite music: {profile.otherInfo.music}</p>
                <p>Favourite food: {profile.otherInfo.food}</p>
                <p>Favourite TV shows: {profile.otherInfo.tvShows}</p>
                <p>Favourite movies: {profile.otherInfo.movies}</p>
                <p>Favourite quote: {profile.otherInfo.quote}</p>
            </div>
        )
    }

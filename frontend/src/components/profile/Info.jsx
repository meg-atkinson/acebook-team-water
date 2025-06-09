export const Info = ({ showInfo, user }) => {
    if (!showInfo) {
        return null;
    }
    if (!user || !user.otherInfo) {
        return <p>Loading info...</p>;
    }
        return (
            <div className="infoContainer">
                <h2>Your Personal Info:</h2>
                <p>Personal interests: {user.otherInfo.interests}</p>
                <p>Favourite music: {user.otherInfo.music}</p>
                <p>Favourite food: {user.otherInfo.food}</p>
                <p>Favourite TV shows: {user.otherInfo.tvShows}</p>
                <p>Favourite movies: {user.otherInfo.movies}</p>
                <p>Favourite quote: {user.otherInfo.quote}</p>
            </div>
        )
    }

export const Info = ({ showInfo }) => {

    if (showInfo) {
        return (
            <div className="infoContainer">
                <h2>Your personal info:</h2>
                <p>Personal interests: user.extraInfo.interests</p>
                <p>Favourite music: user.extraInfo.music</p>
                <p>Favourite food: user.extraInfo.food</p>
                <p>Favourite TV shows: user.extraInfo.tv</p>
                <p>Favourite movies: user.extraInfo.movies</p>
                <p>Favourite quote: user.extraInfo.quote</p>
            </div>
        )
    }
}
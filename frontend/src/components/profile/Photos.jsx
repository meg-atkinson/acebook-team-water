export const Photos = ({ showPhotos, profile }) => {
    if (showPhotos) {
        // use the virtual from the backend to acces otherPhotosUrl property on a user
        // so don't need to construct url in front end
        const photos = profile?.photos?.otherPhotosUrls || [];
    
        return (
        <div className="photosContainer">
            <div className="photosGridContainer">
            {photos.map((photo, index) => (
                <img 
                key={index} 
                src={photo}
                alt={`Photo ${index + 1}`}
                />
            ))}
            </div>
        </div>
        );
    }
};
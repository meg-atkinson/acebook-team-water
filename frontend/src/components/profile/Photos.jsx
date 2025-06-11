export const Photos = ({ showPhotos, profile }) => {
    if (showPhotos) {
        const photos = profile?.photos?.otherPhotos || [];
    
        return (
        <div className="photosContainer">
            <div className="photosGridContainer">
            {photos.map((photoPath, index) => (
                <img 
                key={index} 
                src={`http://localhost:3000/${photoPath}`}
                alt={`Photo ${index + 1}`}
                />
            ))}
            </div>
        </div>
        );
    }
};
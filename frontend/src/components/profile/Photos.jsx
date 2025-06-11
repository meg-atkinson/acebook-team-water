export const Photos = ({ showPhotos, user }) => {
    if (showPhotos) {
        const photos = user?.photos?.otherPhotos || [];
    
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
export const Photos = ({ showPhotos }) => {

    const photos = [
        {key: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'},
        {key: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'},
        {key: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'},
        {key: 4, src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'},
        {key: 5, src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'},
        {key: 6, src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'},
        {key: 7, src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'},
        {key: 8, src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'},
        {key: 9, src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'},
        {key: 10, src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} ]

    if (showPhotos) {
        return (
            <div className="photosContainer">
                <div className="photosGridContainer">
                    {photos.map(photo => {
                        return (<img key={photo.id} src={photo.src} />)})}
                </div>
            </div>
        )
    }
}
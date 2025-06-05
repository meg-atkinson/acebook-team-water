import { useState } from 'react';
import './NewPost.css';



const placeholderMessages = [
    "What's on your mind?",
    "Share your thoughts...",
    "Write something cool!",
    "Got news? Type here!",
    "Tell us what's happening..."
];


const NewPost = ({ onPostCreated }) => {

    const [newPost, setNewPost] = useState("");
    const [imagePreview, setImagePreview] = useState(null)

    const randomPlaceholder = placeholderMessages[Math.floor(Math.random() * placeholderMessages.length)];

    const handleImageChange = (event) => {
    const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
            }
        };
    
    // const handleSubmit = async (event) => {
    //     event.preventDefault()
    //     const token = localStorage.getItem("token");
    //     const response = await fetch("http://url.com/newpost", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({ newPost: newPost }),
    // });

    //     if (response.ok) {
    //         const createdPost = await response.json();
    //         setNewPost("");
    //         if (onPostCreated) {
    //             onPostCreated(createdPost);
    //         }
    //     }
    // };

    const handleSubmit = async (event) => {
    event.preventDefault();

    // Simulate a fake "post creation"
    const fakePost = {
        _id: Date.now().toString(),
        message: newPost,
        imageUrl: imagePreview
    };

    setNewPost("");
    setImagePreview(null);
    if (onPostCreated) {
        onPostCreated(fakePost); // pretend it was saved
    }
};

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br />
                <label>Create Post
                    <br />
                    <br />
                    <input type="text" name="post" value={newPost} placeholder={randomPlaceholder} onChange={(event) => setNewPost(event.target.value)}/>
                </label>
                <div className="form-footer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="image-upload"
                    />
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                    <input type="submit" value="Post" />
                </div>
            </form>
        </div>
    )
}

export default NewPost;
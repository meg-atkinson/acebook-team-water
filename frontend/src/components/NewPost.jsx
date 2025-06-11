import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './NewPost.css';
import { createPost } from '../services/posts';

const placeholderMessages = [
    "What's on your mind?",
    "Share your thoughts...",
    "Write something cool!",
    "Got news? Type here!",
    "Tell us what's happening..."
];


const NewPost = ({ onPostCreated }) => {

    const [formData, setFormData] = useState({
        content: "",
        targetUserID: null,
        imageFile: null,
        imagePreview: null
    });
    // get user ID from url 
    const userIDFromURL = useParams();
    const location = useLocation();

    // conditional to check if posting on someone's wall
    useEffect(() => {
        // If route is "/user/:userID" → targetUserID is from the URL
        if (location.pathname.startsWith("/profile/")) {
            setFormData((prevFormData) => ({
                    ...prevFormData,
                    targetUserID: userIDFromURL.id
                }));
        }
    }, [location.pathname, userIDFromURL]);
    const randomPlaceholder = placeholderMessages[Math.floor(Math.random() * placeholderMessages.length)];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }
    
    const handleImageChange = (event) => {
    const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFormData((prevFormData) => ({
                ...prevFormData,
                imagePreview: reader.result,
                imageFile: file 
            }));
            reader.readAsDataURL(file);
            }
        };
    
    const handleSubmit = async (event) => {
        event.preventDefault()        
        const token = localStorage.getItem("token");
        // make FormData() object to upload
        const uploadData = new FormData();
        // populate uploadData()
        uploadData.append('content', formData.content);
        // conditional for targetUserID
        if (formData.targetUserID) {
        uploadData.append('targetUserID', formData.targetUserID);
        }
        // populate upload data 
        if (formData.imageFile) {
        uploadData.append('image', formData.imageFile);
        }

        await createPost(token, uploadData);
        
        //reset form - not working?
        setFormData({
                content: "",
                targetUserID: formData.targetUserID,
                imageFile: null,
                imagePreview: null
            });
        
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';

        if (onPostCreated) {
                onPostCreated();
        }
    };



    return (
        <div>
            <form encType='multipart/form-data' onSubmit={handleSubmit}>
                <br />
                <label>
                    <br />
                    <br />
                    <input 
                        type="text" 
                        name="content" 
                        value={formData.content} 
                        placeholder={randomPlaceholder} 
                        onChange={handleChange}/>
                </label>
                <div className="form-footer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="image-upload"
                    />
                    {formData.imagePreview && (
                        <div className="image-preview">
                            <img 
                            src={formData.imagePreview} 
                            alt="Preview" 
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                            />
                        </div>
                    )}

                    <input type="submit" value="Post" />
                </div>
            </form>
        </div>
    )
}

export default NewPost;
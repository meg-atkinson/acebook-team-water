import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../App";
import '../../pages/EditProfile/EditProfilePage.css';

export const EditSideProfile = ({ user }) => {
    const navigate = useNavigate();
    const { refreshUser } = useUser();
    const [errors, setErrors] = useState({});
    
    // Simplified form data structure
    const [formData, setFormData] = useState({
        firstName: user?.basicInfo?.firstName || "",
        lastName: user?.basicInfo?.lastName || "",
        pronouns: user?.basicInfo?.pronouns || "",
        relStatus: user?.basicInfo?.relStatus || "",
        birthday: user?.basicInfo?.birthday || "",
        homeTown: user?.basicInfo?.homeTown || "",
        profilePicture: null
    });

    // Form field configuration
    const formFields = [
        { name: 'firstName', label: 'First Name', placeholder: 'First Name', required: true },
        { name: 'lastName', label: 'Last Name', placeholder: 'Last Name', required: true },
        { name: 'pronouns', label: 'Pronouns', placeholder: 'They/Them', required: true },
        { name: 'relStatus', label: 'Relationship Status', placeholder: 'Relationship Status', required: false },
        { name: 'birthday', label: 'Birthday', placeholder: 'Day Month', required: true },
        { name: 'homeTown', label: 'Home Town', placeholder: 'Town', required: true }
    ];

    const validateForm = () => {
        const newErrors = {};
        formFields.forEach(field => {
            if (field.required && !formData[field.name]?.trim()) {
                newErrors[field.name] = `${field.label} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFormData(prev => ({ ...prev, profilePicture: file }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) return;

        const uploadData = new FormData();
        
        // Add all form fields to FormData
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'profilePicture' && value) {
                uploadData.append(key, value);
            }
        });

        // Add profile picture if selected
        if (formData.profilePicture) {
            uploadData.append("profilePicture", formData.profilePicture);
        }

        try {
            // Get token from localStorage - same way as login
            const token = localStorage.getItem('token');
            
            // Debug token
            console.log('Token exists:', !!token);
            console.log('Token preview:', token ? `${token.substring(0, 20)}...` : 'No token');
            
            if (!token) {
                setErrors({ submit: 'No authentication token found. Please log in again.' });
                return;
            }
            
            const response = await fetch(`http://localhost:3000/users/me/basic-info`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: uploadData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log("User updated:", result);
                
                // Refresh user data to reflect changes
                await refreshUser();
                
                // Optionally navigate or show success message
                // navigate('/profile');
            } else {
                const errorData = await response.json();
                console.error("Update failed:", errorData);
                
                // If token is invalid, redirect to login
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                }
                
                setErrors({ submit: errorData.message || 'Update failed' });
            }
        } catch (error) {
            console.error("Update error:", error.message);
            setErrors({ submit: 'Network error occurred' });
        }
    };

    if (!user || !user.basicInfo) {
        return <p>Loading profile...</p>;
    }

    const profilePicUrl = user.photos.profilePicture
        ? `http://localhost:3000/${user.photos.profilePicture}`
        : "https://www.hcihealthcare.ng/wp-content/uploads/2016/10/face-avatar.png";

    return (
        <div className="editSideProfile">
            <img src={profilePicUrl} alt="Profile" />
            
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                {/* Render all text fields dynamically */}
                {formFields.map(field => (
                    <div key={field.name}>
                        <label htmlFor={field.name}>{field.label}: </label>
                        <input
                            placeholder={field.placeholder}
                            name={field.name}
                            type="text"
                            value={formData[field.name]}
                            onChange={handleChange}
                            className={errors[field.name] ? "input-error" : ""}
                        />
                        {errors[field.name] && <span className="error-text">{errors[field.name]}</span>}
                        <br />
                    </div>
                ))}

                <label htmlFor="profilePicture">Profile Picture: </label>
                <input
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <br />

                <p>Friends: {user.friends.length}</p>
                
                {errors.submit && <div className="error-text">{errors.submit}</div>}
                <input type="submit" value="Submit changes" />
            </form>
        </div>
    );
};